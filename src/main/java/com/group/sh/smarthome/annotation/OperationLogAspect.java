package com.group.sh.smarthome.annotation;

import com.alibaba.fastjson.JSON;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.service.PublicService;
import com.group.sh.smarthome.util.ConstantEnum;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Method;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Objects;

@Aspect
@Component
@Slf4j
public class OperationLogAspect {
    private static final String COMMA = ",";
    private static final String IP = "127.0.0.1";
    private static final String LOCAL_IP = "0:0:0:0:0:0:0:1";
    /**
     * x-forwarded-for是识别通过HTTP代理或负载均衡方式连接到Web服务器的客户端
     * 最原始的IP地址的HTTP请求头字段
     */
    private static final String HEADER = "x-forwarded-for";
    private static final String UNKNOWN = "unknown";
    /**
     * 经过apache http服务器的请求才会有
     * 用apache http做代理时一般会加上Proxy-Client-IP请求头
     * 而WL-Proxy-Client-IP是它的weblogic插件加上的头。
     */
    private static final String WL_IP = "WL-Proxy-Client-IP";
    private static final Integer IP_LENGTH = 15;

    @Resource
    private PublicService publicService;

    /**
     * 设置操作日志切入点记录操作日志
     * 在注解的位置切入代码
     */
    @Pointcut("@annotation(com.group.sh.smarthome.annotation.OperateLog)")
    public void operateLogPointCut() {

    }

    /**
     * 设置操作异常切入点记录异常日志
     * 扫描所有controller结尾的操作
     * 根据需要修改，一般只需要修改前缀即可，比如你是com.开头的包，将pers改成com即可
     */
    @Pointcut(value = "execution(* com..*Controller.*.*(..))")
    public void operateExcLogPointCut() {

    }


    /*
     * 1、获取参数问题（Body和Query），通过request.getParameterMap()只能获取到Query参数
     *    无法获取到Body，如果通过流的方式获取Body，会出现 getInputStream() has already been called for this request 异常
     * 2、异常原因：@RequestBody这个注解是以流的形式读取请求，它调用过一次了。（getInputStream()和getReader()只能调用一次）
     *    解决办法：暂不清楚
     * 3、获参解决方案：可以通过request.getParameterMap()获取，但只能获取到query参数，无法获取到body参数
     *    可以考虑通过request.getParameterMap()来判断是否为空，为空，则可能是传的body参数
     *       问题：(@RequestBody User user, String name, Integer age)  无法解决，没办法通过判空来解决
     * 4、最终解决方案：统一采用joinPoint.getArgs()来获取参数
     */


    /**
     * 正常返回通知，拦截用户操作日志，连接点正常执行完成后执行
     * @param joinPoint 切入点
     * @param keys      返回结果
     */
    @AfterReturning(value = "operateLogPointCut()", returning = "keys")
    public void saveOperationLog(JoinPoint joinPoint, Object keys) {
        OperationLog operationLog = new OperationLog();
        try {
            setBaseLog(joinPoint, operationLog);
            operationLog.setOperateResponseParam(JSON.toJSONString(keys));
            CommonResult commonResult = (CommonResult) keys;
            operationLog.setOperateResult(commonResult.getSysCode());
            operationLog.setOperateDesc(commonResult.getMessage());
            log.info("系统日志记录："+operationLog.getOperateDesc()+"&操作人是="+operationLog.getOperateUserName());
            // 插入数据库
            publicService.addOperationLogInfo(operationLog);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 设置基础的参数
     * @param joinPoint 切入点
     * @param operationLog 基础日志
     */
    private void setBaseLog(JoinPoint joinPoint, OperationLog operationLog) throws Exception {
        // 获取RequestAttributes
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        // 从获取RequestAttributes中获取HttpServletRequest的信息
        HttpServletRequest request = (HttpServletRequest) requestAttributes.resolveReference(RequestAttributes.REFERENCE_REQUEST);
        // 获取Session信息 - 如果你需要的话
        HttpSession session = (HttpSession) requestAttributes.resolveReference(RequestAttributes.REFERENCE_SESSION);
        // 从切面织入点通过反射机制获取织入点的方法
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        // 获取切入点所在的方法对象
        Method method = signature.getMethod();
        operationLog = setOpLog(method, operationLog);
        if(ConstantEnum.ConstantEnumType.ADMINMOD.getValue().equals(operationLog.getOperateModule().trim())){
            String adminName =  (String) session.getAttribute("adminName");//操作人姓名
            String adminAccount =  (String) session.getAttribute("adminAccount");//操作人ID
            // 比如请求用户的信息，可以通过一个工具类获取，从ThreadLocal里拿出来
            operationLog.setOperateUserId(Integer.valueOf(adminAccount));// 请求用户ID
            operationLog.setOperateUserName(adminName);// 请求用户名称
        }else if(ConstantEnum.ConstantEnumType.USERMOD.getValue().equals(operationLog.getOperateModule().trim())){
            String userName =  (String) session.getAttribute("userName");//操作人姓名
            String userAccount =  (String) session.getAttribute("userAccount");//操作人ID
            // 比如请求用户的信息，可以通过一个工具类获取，从ThreadLocal里拿出来
            operationLog.setOperateUserId(Integer.valueOf(userAccount));// 请求用户ID
            operationLog.setOperateUserName(userName);// 请求用户名称
        }
        String methodName = getMethodName(joinPoint, method);
        String params = getParams(joinPoint);
        String headerParams = getHeaders(request);
        operationLog.setRequestParam(params);//请求参数
        operationLog.setHeaderParam(headerParams);//请求头参数
        operationLog.setOperateMethod(methodName);//请求方法名
        operationLog.setOperateUri(request.getRequestURI());// 请求URI
        operationLog.setOperateIp(getIpAddr(request));// 请求IP
        operationLog.setCrtTm(new Date());// 创建时间
        operationLog.setDelId("0");// 删除标识
    }

    /**
     * 设置@OperateLog注解的参数
     * @param method 方法
     * @param operationLog 日志
     */
    private OperationLog setOpLog(Method method, OperationLog operationLog){
        // 获取操作信息 - 就是获取@OperateLog里面信息
        OperateLog opLog = method.getAnnotation(OperateLog.class);
        if (null != opLog) {
            // 操作模块 - 如（管理员模块）
            operationLog.setOperateModule(opLog.operateModule());
            // 请求类型 - 如（POST）
            operationLog.setOperateType(opLog.operateType());
            // 操作描述 - 如（新增管理员）
            operationLog.setOperateDesc(opLog.operateDesc());
        }
        return operationLog;
    }

    /**
     * 转换异常信息为字符串
     * @param exceptionName    异常名称
     * @param exceptionMessage 异常信息
     * @param elements         堆栈信息
     */
    private String stackTraceToString(String exceptionName, String exceptionMessage, StackTraceElement[] elements) {
        StringBuffer strBuff = new StringBuffer();
        for (StackTraceElement stet : elements) {
            strBuff.append(stet + "\n");
        }
        return exceptionName + ":" + exceptionMessage + "\n\t" + strBuff.toString();
    }

    /**
     * 获取方法名
     * @param joinPoint 切入点
     * @param method 方法对象
     * @return 方法名
     */
    private String getMethodName(JoinPoint joinPoint, Method method){
        // 获取请求的类名
        String className = joinPoint.getTarget().getClass().getName();
        // 获取请求的方法名
        String methodName = method.getName();
        // 拼接类名和方法名 - pers.liuchengyin.controller.xxxController
        methodName = className + "." + methodName;
        return methodName;
    }

    /**
     * 获取方法请求参数
     * @param joinPoint 切入点
     * @return 参数JSON字符串
     */
    private String getParams(JoinPoint joinPoint){
        // 获取参数名
        String[] parameterNames = ((MethodSignature) joinPoint.getSignature()).getParameterNames();
        // 参数的JSON字符串
        String params = "";
        if(null != parameterNames && parameterNames.length != 0){
            // 获取参数
            Object[] args = joinPoint.getArgs();
            // 将 <参数名, 参数> 打入map
            HashMap<String, Object> map = new HashMap<>();
            for (int i = 0; i < parameterNames.length; i++){
                map.put(parameterNames[i],args[i]);
            }
            // 使用FastJson将其转换为字符串
            params = JSON.toJSONString(map);
        }
        return params;
    }

    /**
     * 获取Headers，并将其转换成JSON字符串
     * @param request HttpServletRequest
     * @return headers的JSON字符串
     */
    private String getHeaders(HttpServletRequest request) {
        // 获取请求头参数
        Enumeration<String> headerNames = request.getHeaderNames();
        // 请求头的JSON字符串
        String headerParams = "";
        if(null != headerNames){
            HashMap<String, String> headMap = new HashMap<>(7);
            while(headerNames.hasMoreElements()){
                String key = headerNames.nextElement();
                String value = request.getHeader(key);
                headMap.put(key,value);
            }
            // 使用FastJson将其转换为字符串
            headerParams = JSON.toJSONString(headMap);
        }
        return headerParams;
    }

    /**
     * 获取IP地址
     * @param request HttpServletRequest
     * @return IP地址
     */
    private String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader(HEADER);
        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getHeader(WL_IP);
        }
        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
            if (ip.equals(IP) || ip.equals(LOCAL_IP)) {
                // 根据网卡获取本机配置的IP地址
                InetAddress inetAddress = null;
                try {
                    inetAddress = InetAddress.getLocalHost();
                } catch (UnknownHostException e) {
                    e.printStackTrace();
                }
                if (Objects.nonNull(inetAddress)) {
                    ip = inetAddress.getHostAddress();
                }
            }
        }
        // 对于通过多个代理的情况，第一个IP为客户端真实的IP地址，多个IP按照','分割
        if (null != ip && ip.length() > IP_LENGTH) {
            // "***.***.***.***".length() = 15
            if (ip.indexOf(COMMA) > 0) {
                ip = ip.substring(0, ip.indexOf(COMMA));
            }
        }
        return ip;
    }

}

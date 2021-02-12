package com.group.sh.smarthome.interceptor;

import com.group.sh.smarthome.entity.MenuTreeInfo;
import com.group.sh.smarthome.util.FileUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 拦截器实现类具体拦截方法
 */
public class smartHomeInterceptor implements HandlerInterceptor {


    /**
     * 该方法会在控制器方法前执行，其返回值表示是否中断后续操作。当其返回值为true时，表示继续向下执行；
     * 当其返回值为false时，会中断后续的所有操作（包括调用下一个拦截器和控制器类中的方法执行等）
     *
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     * request.getSchema()可以返回当前页面使用的协议，就是上面例子中的“http”
     * request.getServerName()可以返回当前页面所在的服务器的名字，就是上面例子中的“localhost"
     * request.getServerPort()可以返回当前页面所在的服务器使用的端口，
     * request.getContextPath()可以返回当前页面所在的应用的名字
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String uri = request.getRequestURI();//拿到拦截的页面
        String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
        System.out.println("uri=" + uri);
        Object adminNum = request.getSession().getAttribute("adminAccount");
        Object userNum = request.getSession().getAttribute("userAccount");
//        if (uri.endsWith("Login")||uri.endsWith("Exit")){
//            //如果是访问登陆或者退出可以直接访问
//            return true;
//        }
//        if (uri.contains("adminNavigation") || uri.contains("adminMain")
//                ||uri.contains("adminInfo")||uri.contains("changeAdminPwd")||uri.contains("protect") ||uri.contains("userNavigation") || uri.contains("userMain")
//                || uri.contains("changeUserPwd") || uri.contains("userInfo")
//                || uri.contains("billInfo") || uri.contains("accountInfo")){
//            //判断要访问的是主页的方法
//            return true;
//        }
//        if (uri.contains("admin")){
//            //判断管理员是否登录
//            if (request.getSession().getAttribute("adminAccount") != null) {
//                return true;
//            }else {
//                response.sendRedirect(basePath + "/smarthome/admin/path/adminLogin");
//                //重定向之后放行
//                return false;
//            }
//        }
//        if (uri.contains("user")){
//            //判断管理员是否登录
//            if (request.getSession().getAttribute("userAccount") != null) {
//                return true;
//            }else {
//                response.sendRedirect(basePath + "/smarthome/user/path/userLogin");
//                //重定向之后放行
//                return false;
//            }
//        }
//        if (uri.contains("public")){
//            return true;
//        }
        Map<String,Object> userInfoMap = new LinkedHashMap<>();
        Boolean flag = null;
        if(adminNum != null && !adminNum.toString().equals("")){
            userInfoMap.put("adminAccount",request.getSession().getAttribute("adminAccount"));
            userInfoMap.put("adminName",request.getSession().getAttribute("adminName"));
            userInfoMap.put("adminRole",request.getSession().getAttribute("adminRole"));
            userInfoMap.put("tblMenuList",request.getSession().getAttribute("tblMenuList"));
            flag = findAdminUsePow(userInfoMap,uri,basePath,request,response);
        }
        if(userNum != null && !userNum.toString().equals("") ){
            userInfoMap.put("userAccount",request.getSession().getAttribute("userAccount"));
            userInfoMap.put("userName",request.getSession().getAttribute("userName"));
            flag = findUserUsePow(userInfoMap,uri,basePath,request,response);
        }
        if(flag == null){
            request.getSession().invalidate();
            //response.sendRedirect(basePath + "/smarthome/public/path/404");//未登陆，返回登陆页面
            return false;
        }
        return flag;
        //response.sendRedirect(basePath + "/public/path/404");
        //return false;
    }

    private Boolean findAdminUsePow(Map<String,Object> userInfoMap,String uri,String basePath,HttpServletRequest request, HttpServletResponse response) throws IOException {
        if(userInfoMap.get("adminAccount") == null || userInfoMap.get("adminAccount").equals("")){
            if(!uri.contains("path")||uri.contains("protect")){
                return true;//如果uri地址不存在path则放行请求
            }
            request.getSession().invalidate();
            response.sendRedirect(basePath + "/smarthome/admin/path/adminLogin");//未登陆，返回登陆页面
            return false;
        }else if(userInfoMap.get("adminAccount") != null || !userInfoMap.get("adminAccount").equals("") ){
            if(uri.contains("adminExit")){
                request.getSession().invalidate();
                response.sendRedirect(basePath + "/smarthome/admin/path/adminLogin");//返回登陆页面
                return true;//如果uri地址存在管理员退出请求则放行请求
            }
            if(!uri.contains("path") || uri.contains("adminNavigation") || uri.contains("adminMain")
                    ||uri.contains("adminInfo")||uri.contains("changeAdminPwd")||uri.contains("protect")){
                return true;
            }
            /*
             *以下代码用于登录用户的权限判断，如果该用户没有权限访问url则return false否则为true
             */
            List<MenuTreeInfo> menuTreeInfoList = (List<MenuTreeInfo>) userInfoMap.get("tblMenuList");
            List<MenuTreeInfo> menuList = new ArrayList<>();
            for (MenuTreeInfo menu: menuTreeInfoList) {
                menuList.addAll(menu.getChildren());
            }
            for (MenuTreeInfo menu: menuList) {
                if(uri.equals(menu.getDataUrl()) || menu.getDataUrl().contains("public")){
                    return true;//已登陆，放行请求
                }
            }
        }
        return false;
    }

    private Boolean findUserUsePow(Map<String,Object> userInfoMap,String uri,String basePath,HttpServletRequest request, HttpServletResponse response) throws IOException {
        if(userInfoMap.get("userAccount") == null || userInfoMap.get("userAccount").equals("")){
            if(!uri.contains("path")){
                return true;//如果uri地址不存在path则放行请求
            }
            request.getSession().invalidate();
            response.sendRedirect(basePath + "/smarthome/user/path/userLogin");//未登陆，返回登陆页面
            return false;
        }else if(userInfoMap.get("userAccount") != null || !userInfoMap.get("userAccount").equals("") ){
            if(uri.contains("userExit")){
                request.getSession().invalidate();
                response.sendRedirect(basePath + "/smarthome/user/path/userLogin");//返回登陆页面
                return true;//如果uri地址存在管理员退出请求则放行请求
            }
            if(!uri.contains("path")||uri.contains("userNavigation") || uri.contains("userMain")
                    || uri.contains("changeUserPwd") || uri.contains("userInfo") || uri.contains("protect")
                    || uri.contains("billInfo") || uri.contains("accountInfo")){
                return true;
            }
        }
        return false;
    }


    /**
     * 该方法会在控制器方法调用之后，且解析视图之前执行。可以通过此方法对请求域中的模型和视图做出进一步的修改
     *
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    /**
     * 该方法会在整个请求完成，即视图渲染结束之后执行。可以通过此方法实现一些资源清理、记录日志信息等工作
     *
     * @param request
     * @param response
     * @param handler
     * @param ex
     * @throws Exception
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}

package com.group.sh.smarthome.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.group.sh.smarthome.entity.TblUser;
import com.group.sh.smarthome.mapper.TblUserMapper;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.util.ConstantEnum;
import com.group.sh.smarthome.util.EntryrionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Objects;

/**
 * <p>
 *  用户模块服务实现类
 * </p>
 *
 * @author fzq
 * @since 2020-11-26
 */
@Service
@Slf4j
public class TblUserService extends ServiceImpl<TblUserMapper, TblUser> {

    private HttpServletRequest getUserRequest() {
        return ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
    }

    public String getUserAccount() {
        HttpSession session = getUserRequest().getSession();
        return (String) session.getAttribute("userAccount");
    }

    @Resource
    private TblUserMapper tblUserMapper;

    public String returnUrl(String url){
        if(null != url){
            if("userExit".equals(url)){
                url = "userLogin";
                return "userhtml/"+url;
            }else {
                return "userhtml/"+url;
            }
        }
        return null;
    }

    /**
     *
     * 方法描述 获取下一个ID
     * @date 2020-11-26
     * @param
     */
    public String getNextUserID() {
        return tblUserMapper.getNextUserID();
    }

    /**
     *
     * 方法描述 用户登录方法
     * @date 2020-11-26
     * @param tblUser
     */
    public CommonResult userLogin(TblUser tblUser){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblUser) {
            return new CommonResult(500, "请求参数为null，请联系开发商！", null,tblUser, null,null);
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblUser.getUserPwd()) {
            tblUser.setUserPwd(EntryrionUtil.getHash3(tblUser.getUserPwd(),"SHA"));
        }
        TblUser User = tblUserMapper.userLogin(tblUser);
        log.info("******查询的结果是: " + User);
        if(ConstantEnum.ConstantEnumType.getENTITY() == User) {
            return new CommonResult(500, "账号或密码错误，请重新输入！多次输入不正确，请联系管理员处理！", null,tblUser, null,null);
        }
        if(ConstantEnum.ConstantEnumType.STATUSNUM.getValue().equals(User.getUserStatus()) || ConstantEnum.ConstantEnumType.CONSTANT == User.getUserStatus()){
            return new CommonResult(501, "该用户禁止登录，请联系管理员处理！", null,User, null,null);
        }
        if(ConstantEnum.ConstantEnumType.DELETENUM.getValue().equals(User.getDelId()) || ConstantEnum.ConstantEnumType.CONSTANT == User.getDelId()){
            return new CommonResult(502, "该用户不存在，请先进行注册！", null,User, null,null);
        }
        ConstantEnum.ConstantEnumType.roleId = Integer.valueOf(User.getUserRole());
        HttpSession session = getUserRequest().getSession();
        session.setAttribute("userAccount",User.getUserAccount());
        session.setAttribute("userName",User.getUserName());
        session.setMaxInactiveInterval(30 * 60);//session过期时间设置，以秒为单位，即在没有活动30分钟后，session将失效
        return new CommonResult(200, "欢迎您："+User.getUserName()+" ，登录成功！", null,User, null,null);
    }

}

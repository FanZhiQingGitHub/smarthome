package com.group.sh.smarthome.controller;


import com.group.sh.smarthome.entity.TblUser;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.service.TblUserService;
import com.group.sh.smarthome.util.ConstantEnum;
import com.group.sh.smarthome.util.EntryrionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * <pre>
 *      Title: 用户功能控制层
 *      Description: 对用户信息进行增删改查
 * </pre>
 * @author fzq
 * @version 1.00.00
 * @since 创建日期：2020-11-26
 */
@Controller
@RequestMapping("/smarthome")
@Slf4j
public class TblUserController {

    private String userCode = null;

    @Resource
    private TblUserService tblUserService;

    /**
     *
     * 方法描述 用户功能界面跳转方法
     * @date 2020-11-26
     * @param path
     */
    @RequestMapping("/path/{url}")
    public String showView(@PathVariable(value = "url") String path) {
        return "userPage/userHtml/" + path;
    }

    /**
     *
     * 方法描述 用户登录方法
     * @date 2020-11-26
     * @param tblUser
     */
    @GetMapping(value = "/userLogin")
    @ResponseBody
    public CommonResult userLogin(TblUser tblUser){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblUser) {
            return new CommonResult(500, "请求参数为null，请联系开发商！", tblUser, null);
        }
        tblUser.setUserPwd(EntryrionUtil.getHash3(tblUser.getUserPwd(),"SHA"));
        TblUser User = tblUserService.userLogin(tblUser);
        log.info("******查询的结果是: " + User);
        if(ConstantEnum.ConstantEnumType.getENTITY() == User) {
            return new CommonResult(500, "账号或密码错误，请重新输入！多次输入不正确，请联系管理员处理！", tblUser, null);
        }
        if(ConstantEnum.ConstantEnumType.STATUSNUM.getValue().equals(User.getUserStatus()) || ConstantEnum.ConstantEnumType.CONSTANT == User.getUserStatus()){
            return new CommonResult(501, "该用户禁止登录，请联系管理员处理！", User, null);
        }
        if(ConstantEnum.ConstantEnumType.DELETENUM.getValue().equals(User.getUserStatus()) || ConstantEnum.ConstantEnumType.CONSTANT == User.getDelId()){
            return new CommonResult(502, "该用户不存在，请先进行注册！", User, null);
        }
        return new CommonResult(200, "欢迎您："+User.getUserName()+" ，登录成功！", User, null);
    }

    /**
     *
     * 方法描述 用户查询列表方法
     * @date 2020-11-26
     * @param tblUser
     */
    @GetMapping(value = "/getUserInfoList")
    @ResponseBody
    public CommonResult getUserInfoList(TblUser tblUser){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblUser) {
            return new CommonResult(500, "请求参数为null，请联系开发商！", tblUser, null);
        }
        List<TblUser> tblUserList = tblUserService.getUserInfoList(tblUser);
        log.info("******查询的结果是: " + tblUserList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblUserList.size()) {
            return new CommonResult(501, "查询数据失败", tblUser, tblUserList);
        }
        return new CommonResult(200, "查询数据成功", tblUser, tblUserList);
    }


    /**
     *
     * 方法描述 用户注册方法
     * @date 2020-11-26
     * @param tblUser
     */
    @PostMapping(value = "/addUserInfo")
    @ResponseBody
    public CommonResult addUserInfo(TblUser tblUser){
        Integer num = null;
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblUser){
            return new CommonResult(500,"请求参数为null，请联系开发商！",tblUser,null);
        }
        SimpleDateFormat date = new SimpleDateFormat("yyyyMMdd");
        tblUser.setUserPwd(EntryrionUtil.getHash3(tblUser.getUserPwd(),"SHA"));//密码加密
        tblUser.setUserAccount(date.format(new Date())+tblUserService.getNextUserID());
        tblUser.setUserStatus("0");
        tblUser.setCrtPsnId(tblUserService.getNextUserID());
        tblUser.setCrtTm(new Date());
        tblUser.setDelId("0");
        tblUser.setUserCode("0");//0--用户，1--管理员，2--超级管理员
        num = tblUserService.addUserInfo(tblUser);
        log.info("******新增的用户ID是: "+tblUser.getUserId());
        if(Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == num){
            return new CommonResult(501,"新增数据失败",tblUser,null);
        }
        return new CommonResult(200,"新增数据成功",tblUser,null);
    }

    /**
     *
     * 方法描述 用户信息更新方法
     * @date 2020-11-26
     * @param tblUser
     */
    @PostMapping(value = "/updateUserInfo")
    @ResponseBody
    public Boolean updateUserInfo(TblUser tblUser){
        Boolean flag = tblUserService.updateUserInfo(tblUser);
        return flag;
    }

    /**
     *
     * 方法描述 用户信息逻辑删除方法
     * @date 2020-11-26
     * @param tblUser
     */
    @PostMapping(value = "/deleteUserInfo")
    @ResponseBody
    public Boolean deleteUserInfo(TblUser tblUser){
        Boolean flag = tblUserService.deleteUserInfo(tblUser);
        return flag;
    }

}


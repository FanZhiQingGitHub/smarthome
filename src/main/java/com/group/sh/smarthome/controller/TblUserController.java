package com.group.sh.smarthome.controller;


import com.group.sh.smarthome.entity.TblUser;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.service.TblUserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

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
@RequestMapping("/smarthome/user")
public class TblUserController {

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
        return tblUserService.userLogin(tblUser);
    }

}


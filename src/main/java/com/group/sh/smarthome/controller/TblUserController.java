package com.group.sh.smarthome.controller;


import com.group.sh.smarthome.annotation.OperateLog;
import com.group.sh.smarthome.entity.TblHisbill;
import com.group.sh.smarthome.entity.TblUser;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.resultbean.PageListEntity;
import com.group.sh.smarthome.service.TblUserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
     * @param url
     */
    @GetMapping(value = "/path/{url}")
    public String showView(@PathVariable(value = "url") String url) {
        return tblUserService.returnUrl(url);
    }

    /**
     *
     * 方法描述 用户登录方法
     * @date 2020-11-26
     * @param tblUser
     */
    @GetMapping(value = "/userLogin")
    @ResponseBody
    @OperateLog(operateModule = "用户模块 ", operateType = "GET", operateDesc = "用户登录")
    public CommonResult userLogin(TblUser tblUser){
        return tblUserService.userLogin(tblUser);
    }

    /**
     *
     * 方法描述 查找账单信息列表
     * @date 2021-02-01
     * @param
     */
    @GetMapping(value = "/findALLBillList")
    @ResponseBody
    public CommonResult findALLBillList(TblHisbill tblHisbill, PageListEntity pageListEntity){
        return tblUserService.findALLBillList(tblHisbill,pageListEntity);
    }

    /**
     *
     * 方法描述 账单信息列表维护方法
     * @date 2021-02-01
     * @param
     */
    @PostMapping(value = "/protectBillList")
    @ResponseBody
    @OperateLog(operateModule = "用户模块 ", operateType = "POST", operateDesc = "账单信息维护")
    public CommonResult protectBillList(TblHisbill tblHisbill){
        return tblUserService.protectBillList(tblHisbill);
    }

}


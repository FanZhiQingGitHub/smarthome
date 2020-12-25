package com.group.sh.smarthome.controller;


import com.group.sh.smarthome.entity.*;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.resultbean.PageListEntity;
import com.group.sh.smarthome.service.TblAdminService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;

/**
 * <pre>
 *      Title: 管理员功能控制层
 *      Description: 对管理员及用户信息进行增删改查
 * </pre>
 * @author fzq
 * @version 1.00.00
 * @since 创建日期：2020-12-5
 */
@Controller
@RequestMapping("/smarthome/admin")
public class TblAdminController {

    @Resource
    private TblAdminService tblAdminService;

    /**
     *
     * 方法描述 管理员功能界面跳转方法
     * @date 2020-12-5
     * @param
     */
    @RequestMapping(value = "/path/{url}",method = RequestMethod.GET)
    public String showView(@PathVariable(value = "url") String url) {
        return "adminhtml/"+url;
    }

    /**
     *
     * 方法描述 管理员登录方法
     * @date 2020-12-5
     * @param tblAdmin
     */
    @GetMapping(value = "/adminLogin")
    @ResponseBody
    public CommonResult adminLogin(TblAdmin tblAdmin){
        return tblAdminService.adminLogin(tblAdmin);
    }



    /**
     *
     * 方法描述 管理员登录后查询菜单方法
     * @date 2020-12-8
     * @param
     */
    @GetMapping(value = "/findMenuIDByRoleId")
    @ResponseBody
    public CommonResult findMenuIDByRoleId(TblAdmin tblAdmin){
        return tblAdminService.findMenuIDByRoleId(tblAdmin);
    }

    /**
     *
     * 方法描述 管理员登录后查询菜单方法及维护菜单维护详情页面的父级菜单下拉框查询
     * @date 2020-12-8
     * @param
     */
    @GetMapping(value = "/findALLMenuList")
    @ResponseBody
    public CommonResult findALLMenuList(TblMenu tblMenu, PageListEntity pageListEntity){
        return tblAdminService.findALLMenuList(tblMenu,pageListEntity);
    }

    /**
     *
     * 方法描述 菜单信息维护方法
     * @date 2020-12-9
     * @param
     */
    @PostMapping(value = "/protectMenuList")
    @ResponseBody
    public CommonResult protectMenuList(TblMenu tblMenu){
        return tblAdminService.protectMenuList(tblMenu);
    }

    /**
     *
     * 方法描述 查找角色列表
     * @date 2020-12-11
     * @param
     */
    @GetMapping(value = "/findALLRoleList")
    @ResponseBody
    public CommonResult findALLRoleList(TblRole tblRole, PageListEntity pageListEntity){
        return tblAdminService.findALLRoleList(tblRole,pageListEntity);
    }

    /**
     *
     * 方法描述 角色信息维护方法
     * @date 2020-12-11
     * @param
     */
    @PostMapping(value = "/protectRoleList")
    @ResponseBody
    public CommonResult protectRoleList(TblRole tblRole){
        return tblAdminService.protectRoleList(tblRole);
    }


    /**
     *
     * 方法描述 查找所有菜单列表--权限配置
     * @date 2020-12-11
     * @param
     */
    @GetMapping(value = "/findMenuPwr")
    @ResponseBody
    public CommonResult findMenuPwr(TblAdmin tblAdmin){
        return tblAdminService.findMenuPwr(tblAdmin);
    }

    /**
     *
     * 方法描述 查找所有菜单列表--权限配置维护
     * @date 2020-12-11
     * @param
     */
    @PostMapping(value = "/protectMenuPwr")
    @ResponseBody
    public CommonResult protectMenuPwr(TbleMenuRole tbleMenuRole){
        return tblAdminService.protectMenuPwr(tbleMenuRole);
    }

    /**
     *
     * 方法描述 查找用户列表
     * @date 2020-12-12
     * @param
     */
    @GetMapping(value = "/findALLUserList")
    @ResponseBody
    public CommonResult findALLUserList(TblUser tblUser, PageListEntity pageListEntity){
        return tblAdminService.findALLUserList(tblUser,pageListEntity);
    }

    /**
     *
     * 方法描述 用户信息维护方法
     * @date 2020-12-12
     * @param
     */
    @PostMapping(value = "/protectUserList")
    @ResponseBody
    public CommonResult protectUserList(TblUser tblUser){
        return tblAdminService.protectUserList(tblUser);
    }

    /**
     *
     * 方法描述 查找管理员列表
     * @date 2020-12-12
     * @param
     */
    @GetMapping(value = "/findALLAdminList")
    @ResponseBody
    public CommonResult findALLAdminList(TblAdmin tblAdmin, PageListEntity pageListEntity){
        return tblAdminService.findALLAdminList(tblAdmin,pageListEntity);
    }

    /**
     *
     * 方法描述 管理员信息维护方法
     * @date 2020-12-12
     * @param
     */
    @PostMapping(value = "/protectAdminList")
    @ResponseBody
    public CommonResult protectAdminList(TblAdmin tblAdmin){
        return tblAdminService.protectAdminList(tblAdmin);
    }

    /**
     *
     * 方法描述 管理员个人资料信息维护方法
     * @date 2020-12-19
     * @param
     */
    @PostMapping(value = "/protectAdminProInfo")
    @ResponseBody
    public CommonResult protectAdminProInfo(TblAdmin tblAdmin){
        return tblAdminService.protectAdminProInfo(tblAdmin);
    }

    /**
     *
     * 方法描述 管理员个人资料信息维护头像上传
     * @date 2020-12-19
     * @param
     */
    @PostMapping(value = "/uploadAdminHeadInfo")
    @ResponseBody
    public CommonResult uploadAdminHeadInfo(TblAdmin tblAdmin,@RequestParam("file") MultipartFile file) throws IOException {
        return tblAdminService.uploadAdminHeadInfo(tblAdmin,file);
    }

    /**
     *
     * 方法描述 查找平台资讯列表
     * @date 2020-12-24
     * @param
     */
    @GetMapping(value = "/findALLInfoList")
    @ResponseBody
    public CommonResult findALLInfoList(TblInfo tblInfo, PageListEntity pageListEntity){
        return tblAdminService.findALLInfoList(tblInfo,pageListEntity);
    }

    /**
     *
     * 方法描述 平台资讯信息维护方法
     * @date 2020-12-24
     * @param
     */
    @PostMapping(value = "/protectInfoList")
    @ResponseBody
    public CommonResult protectInfoList(TblInfo tblInfo){
        return tblAdminService.protectInfoList(tblInfo);
    }


}


package com.group.sh.smarthome.controller;


import com.group.sh.smarthome.entity.MenuTreeInfo;
import com.group.sh.smarthome.entity.TblAdmin;
import com.group.sh.smarthome.entity.TblMenu;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.resultbean.PageListEntity;
import com.group.sh.smarthome.service.TblAdminService;
import com.group.sh.smarthome.util.ConstantEnum;
import com.group.sh.smarthome.util.EntryrionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

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
@Slf4j
public class TblAdminController {

    private String adminCode = null;

    @Resource
    private TblAdminService tblAdminService;

    private HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
    }

    public String getAccount() {
        HttpSession session = getRequest().getSession();
        return (String) session.getAttribute("adminAccount");
    }


    /**
     *
     * 方法描述 管理员功能界面跳转方法
     * @date 2020-12-5
     * @param path
     */
    @RequestMapping("/path/{url}")
    public String showView(@PathVariable(value = "url") String path) {
        return "adminPage/adminHtml/" + path;
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
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblAdmin) {
            return new CommonResult(500, "请求参数为null，请联系开发商！", null,tblAdmin, null);
        }
        tblAdmin.setAdminPwd(EntryrionUtil.getHash3(tblAdmin.getAdminPwd(),"SHA"));
        TblAdmin Admin = tblAdminService.adminLogin(tblAdmin);
        log.info("******查询的结果是: " + Admin);
        if(ConstantEnum.ConstantEnumType.getENTITY() == Admin) {
            return new CommonResult(500, "账号或密码错误，请重新输入！多次输入不正确，请联系管理员处理！", null,tblAdmin, null);
        }
        if(ConstantEnum.ConstantEnumType.STATUSNUM.getValue().equals(Admin.getAdminStatus()) || ConstantEnum.ConstantEnumType.CONSTANT == Admin.getAdminStatus()){
            return new CommonResult(501, "该用户禁止登录，请联系管理员处理！", null,Admin, null);
        }
        if(ConstantEnum.ConstantEnumType.DELETENUM.getValue().equals(Admin.getDelId()) || ConstantEnum.ConstantEnumType.CONSTANT == Admin.getDelId()){
            return new CommonResult(502, "该用户不存在，请先进行注册！", null,Admin, null);
        }
        ConstantEnum.ConstantEnumType.roleId = Integer.valueOf(Admin.getAdminRole());
        HttpSession session = getRequest().getSession();
        session.setAttribute("adminAccount",Admin.getAdminAccount());
        session.setMaxInactiveInterval(30 * 60);//session过期时间设置，以秒为单位，即在没有活动30分钟后，session将失效
        return new CommonResult(200, "欢迎您："+Admin.getAdminName()+" ，登录成功！", null,Admin, null);
    }

    /**
     *
     * 方法描述 管理员查询列表方法
     * @date 2020-12-5
     * @param tblAdmin
     */
    @GetMapping(value = "/getAdminInfoList")
    @ResponseBody
    public CommonResult getAdminInfoList(TblAdmin tblAdmin){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblAdmin) {
            return new CommonResult(500, "请求参数为null，请联系开发商！", null,tblAdmin, null);
        }
        List<TblAdmin> tblAdminList = tblAdminService.getAdminInfoList(tblAdmin);
        log.info("******查询管理员列表的结果是: " + tblAdminList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblAdminList.size()) {
            return new CommonResult(501, "查询数据失败", null,tblAdmin, tblAdminList);
        }
        return new CommonResult(200, "查询数据成功", null,tblAdmin, tblAdminList);
    }


    /**
     *
     * 方法描述 管理员注册方法
     * @date 2020-12-5
     * @param tblAdmin
     */
    @PostMapping(value = "/addAdminInfo")
    @ResponseBody
    public CommonResult addAdminInfo(TblAdmin tblAdmin){
        Integer num = null;
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblAdmin){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblAdmin,null);
        }
        SimpleDateFormat date = new SimpleDateFormat("yyyyMMdd");
        tblAdmin.setAdminPwd(EntryrionUtil.getHash3(tblAdmin.getAdminPwd(),"SHA"));//密码加密
        tblAdmin.setAdminAccount(date.format(new Date())+tblAdminService.getNextAdminID());
        tblAdmin.setAdminStatus("0");
        tblAdmin.setCrtPsnId(tblAdminService.getNextAdminID());
        tblAdmin.setCrtTm(new Date());
        tblAdmin.setDelId("0");
        tblAdmin.setAdminRole(0);//0--用户，1--管理员，2--超级管理员
        num = tblAdminService.addAdminInfo(tblAdmin);
        log.info("******新增的管理员ID是: "+tblAdmin.getAdminId());
        if(Integer.valueOf(ConstantEnum.ConstantEnumType.DATABASENUM.getValue()) == num){
            return new CommonResult(501,"新增数据失败",null,tblAdmin,null);
        }
        return new CommonResult(200,"新增数据成功",null,tblAdmin,null);
    }

    /**
     *
     * 方法描述 管理员信息更新方法
     * @date 2020-12-5
     * @param tblAdmin
     */
    @PostMapping(value = "/updateAdminInfo")
    @ResponseBody
    public Boolean updateAdminInfo(TblAdmin tblAdmin){
        Boolean flag = tblAdminService.updateAdminInfo(tblAdmin);
        return flag;
    }

    /**
     *
     * 方法描述 管理员信息逻辑删除方法
     * @date 2020-12-5
     * @param tblAdmin
     */
    @PostMapping(value = "/deleteAdminInfo")
    @ResponseBody
    public Boolean deleteAdminInfo(TblAdmin tblAdmin){
        Boolean flag = tblAdminService.deleteAdminInfo(tblAdmin);
        return flag;
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
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblAdmin){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblAdmin,null);
        }
        List<MenuTreeInfo> tblMenuList = tblAdminService.findMenuIDByRoleId(1);
        log.info("******查询的菜单是: "+tblMenuList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblMenuList.size()) {
            return new CommonResult(501, "查询数据失败", null,null, tblMenuList);
        }
        return new CommonResult(200, "查询数据成功", null,null, tblMenuList);
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
        //查询父级菜单
        if(ConstantEnum.ConstantEnumType.FINDMENUSELECT.getValue().equals(tblMenu.getMethod())){
            List<TblMenu> tblMenuList = tblAdminService.findParentMenu();
            if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblMenuList.size()) {
                return new CommonResult(501, "亲，暂无相关数据", null,null, tblMenuList);
            }
            return new CommonResult(200, null, null,null, tblMenuList);
        }
        //查询菜单列表
        if(ConstantEnum.ConstantEnumType.getENTITY() == pageListEntity.getPage() && ConstantEnum.ConstantEnumType.getENTITY() ==  pageListEntity.getLimit()){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblMenu,null);
        }
        Integer minpage = (pageListEntity.getPage() - 1) * pageListEntity.getLimit();
        Integer maxpage = pageListEntity.getLimit();
        pageListEntity.setPage(minpage);
        pageListEntity.setLimit(maxpage);
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblMenu.getMenuName()){
            pageListEntity.setObjectOne(tblMenu.getMenuName());
        }
        //pageListEntity.setObjectTwo(ConstantEnum.ConstantEnumType.roleId.toString());
        List<TblMenu> tblMenuList = tblAdminService.findALLMenuList(pageListEntity);
        log.info("******查询的菜单列表是: "+tblMenuList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblMenuList.size()) {
            return new CommonResult(501, "亲，暂无相关数据", null,null, tblMenuList);
        }
        Integer count = tblAdminService.findALLMenuListCount(pageListEntity).intValue();
        return new CommonResult(0, null, count,null, tblMenuList);
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

        if(ConstantEnum.ConstantEnumType.getENTITY() == tblMenu.getMethod()){
            new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,null, null);
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblMenu.getMenuUrl()){
            String url = "/smarthome/admin/path/";
            tblMenu.setMenuUrl(url+tblMenu.getMenuUrl());
        }
        if(ConstantEnum.ConstantEnumType.INSERT.getValue().equals(tblMenu.getMethod())){
            tblMenu.setCrtPsnId(getAccount());
            tblMenu.setModPsnId(getAccount());
            //是否父级菜单
            if(!"0".equals(tblMenu.getMenuLevel())){
                tblMenu.setMenuType("tabAdd");
            }
            Integer count = tblAdminService.addMenuInfo(tblMenu);
            if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == count) {
                return new CommonResult(500, "新增菜单失败", count,null, null);
            }
            tblMenu.setMenuId(tblMenu.getMenuId());
            return new CommonResult(200, "新增菜单成功", count,tblMenu, null);
        }

        if(ConstantEnum.ConstantEnumType.UPDATE.getValue().equals(tblMenu.getMethod())){
            tblMenu.setModPsnId(getAccount());
            Boolean flag = tblAdminService.updateMenuInfo(tblMenu);
            if (flag == false) {
                return new CommonResult(500, "更新菜单失败", null,null, null);
            }
            return new CommonResult(200, "更新菜单成功", null,null, null);
        }

        if(ConstantEnum.ConstantEnumType.DELETE.getValue().equals(tblMenu.getMethod())){
            tblMenu.setModPsnId(getAccount());
            Boolean flag = tblAdminService.deleteMenuInfo(tblMenu);
            if (flag == false) {
                return new CommonResult(500, "删除菜单失败", null,null, null);
            }
            return new CommonResult(200, "删除菜单成功", null,null, null);
        }

        return new CommonResult(501, "系统未能正确执行操作方法！", null,null, null);
    }






}


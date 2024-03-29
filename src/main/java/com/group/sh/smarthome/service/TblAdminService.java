package com.group.sh.smarthome.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.group.sh.smarthome.entity.*;
import com.group.sh.smarthome.mapper.TblAdminMapper;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.resultbean.PageListEntity;
import com.group.sh.smarthome.util.ConstantEnum;
import com.group.sh.smarthome.util.EntryrionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * <p>
 *  管理员模块服务实现类
 * </p>
 *
 * @author fzq
 * @since 2020-11-26
 */
@Service
@Slf4j
public class TblAdminService extends ServiceImpl<TblAdminMapper, TblAdmin>{


    private HttpServletRequest getAdminRequest() {
        return ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
    }

    public String getAdminAccount() {
        HttpSession session = getAdminRequest().getSession();
        return (String) session.getAttribute("adminAccount");
    }

    @Resource
    private TblAdminMapper tblAdminMapper;

    public String returnUrl(String url){
        if(null != url){
            if(url.equals("adminExit")){
                url = "adminLogin";
                return "adminhtml/"+url;
            }
            return "adminhtml/"+url;
        }
        return "adminhtml/404";
    }

    public void removeSessionAttributr(HttpServletRequest request){
        Enumeration em = request.getSession().getAttributeNames();  //得到session中所有的属性名
        while (em.hasMoreElements()) {
            request.getSession().removeAttribute(em.nextElement().toString()); //遍历删除session中的值
        }
    }

    public CommonResult adminLogin(TblAdmin tblAdmin){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblAdmin) {
            return new CommonResult(500, "请求参数为null，请联系开发商！", null,tblAdmin, null,null,"1");
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblAdmin.getAdminPwd()) {
            tblAdmin.setAdminPwd(EntryrionUtil.getHash3(tblAdmin.getAdminPwd(),"SHA"));
        }
        TblAdmin Admin = tblAdminMapper.adminLogin(tblAdmin);
        log.info("******查询的结果是: " + Admin);
        if(ConstantEnum.ConstantEnumType.getENTITY() == Admin) {
            return new CommonResult(500, "账号或密码错误，请重新输入！多次输入不正确，请联系管理员处理！", null,tblAdmin, null,null,"1");
        }
        if(ConstantEnum.ConstantEnumType.STATUSNUM.getValue().equals(Admin.getAdminStatus()) || ConstantEnum.ConstantEnumType.CONSTANT == Admin.getAdminStatus()){
            return new CommonResult(501, "该用户禁止登录，请联系管理员处理！", null,Admin, null,null,"1");
        }
        if(ConstantEnum.ConstantEnumType.DELETENUM.getValue().equals(Admin.getDelId()) || ConstantEnum.ConstantEnumType.CONSTANT == Admin.getDelId()){
            return new CommonResult(502, "该用户不存在，请先进行注册！", null,Admin, null,null,"1");
        }
        ConstantEnum.ConstantEnumType.roleId = Integer.valueOf(Admin.getAdminRole());
        HttpSession session = getAdminRequest().getSession();
        session.setAttribute("adminAccount",Admin.getAdminAccount());
        session.setAttribute("adminName",Admin.getAdminName());
        session.setAttribute("adminRole",Admin.getAdminRole());
        List<MenuTreeInfo> tblMenuList = tblAdminMapper.findMenuIDByRoleId(Admin.getAdminRole());
        session.setAttribute("tblMenuList",tblMenuList);
        session.setMaxInactiveInterval(30 * 60);//session过期时间设置，以秒为单位，即在没有活动30分钟后，session将失效
        return new CommonResult(200, "欢迎您："+Admin.getAdminName()+" ，登录成功！", null,Admin, null,null,"0");
    }

    /**
     *
     * 方法描述 重置管理员密码
     * @date 2021-02-02
     * @param tblAdmin
     */
    @Transactional
    public CommonResult resetAdminPassword(TblAdmin tblAdmin){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblAdmin.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,tblAdmin, null,null,"1");
        }
        tblAdmin.setModPsnId(tblAdmin.getAdminAccount());
        tblAdmin.setAdminPwd(EntryrionUtil.getHash3("123456","SHA"));//密码加密
        Boolean flag = tblAdminMapper.resetAdminPassword(tblAdmin);
        if (flag == false) {
            return new CommonResult(500, "重置失败，请确认所填写得账号及关联手机号码是否有误！", null,tblAdmin, null,null,"1");
        }
        HttpSession session = getAdminRequest().getSession();
        session.setAttribute("adminAccount",tblAdmin.getAdminAccount());
        return new CommonResult(200, "您的密码重置成功，新密码为：'123456'", null,tblAdmin, null,null,"0");
    }

    public CommonResult findMenuIDByRoleId(TblAdmin tblAdmin){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblAdmin){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblAdmin,null,null,"1");
        }
        List<MenuTreeInfo> tblMenuList = tblAdminMapper.findMenuIDByRoleId(tblAdmin.getAdminRole());
        log.info("******查询的菜单是: "+tblMenuList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblMenuList.size()) {
            return new CommonResult(501, "查询数据失败", null,tblAdmin, tblMenuList,null,"1");
        }
        return new CommonResult(200, "查询数据成功", null,tblAdmin, tblMenuList,null,"0");
    }


    public CommonResult findALLMenuList(TblMenu tblMenu, PageListEntity pageListEntity){
        //查询父级菜单
        if(ConstantEnum.ConstantEnumType.FINDMENUSELECT.getValue().equals(tblMenu.getMethod())){
            List<TblMenu> tblMenuList = tblAdminMapper.findParentMenu();
            if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblMenuList.size()) {
                return new CommonResult(501, "亲，暂无相关数据", null,tblMenu, tblMenuList,null,"1");
            }
            return new CommonResult(200, null, null,tblMenu, tblMenuList,null,"0");
        }
        //查询菜单列表
        if(ConstantEnum.ConstantEnumType.getENTITY() == pageListEntity.getPage() && ConstantEnum.ConstantEnumType.getENTITY() ==  pageListEntity.getLimit()){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblMenu,null,null,"1");
        }
        Integer minpage = (pageListEntity.getPage() - 1) * pageListEntity.getLimit();
        Integer maxpage = pageListEntity.getLimit();
        pageListEntity.setPage(minpage);
        pageListEntity.setLimit(maxpage);
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblMenu.getMenuName()){
            pageListEntity.setObjectOne(tblMenu.getMenuName());
        }
        //pageListEntity.setObjectTwo(ConstantEnum.ConstantEnumType.roleId.toString());
        List<TblMenu> tblMenuList = tblAdminMapper.findALLMenuList(pageListEntity);
        log.info("******查询的菜单列表是: "+tblMenuList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblMenuList.size()) {
            return new CommonResult(501, "亲，暂无相关数据", null,tblMenu, tblMenuList,null,"1");
        }
        Integer count = tblAdminMapper.findALLMenuListCount(pageListEntity).intValue();
        return new CommonResult(0, null, count,tblMenu, tblMenuList,null,"0");
    }




    @Transactional
    public CommonResult protectMenuList(TblMenu tblMenu){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblMenu.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,tblMenu, null,null,"1");
        }
        if(!"0".equals(tblMenu.getMenuLevel())){
            if(ConstantEnum.ConstantEnumType.getENTITY() != tblMenu.getMenuUrl()){
                String url = "/smarthome/admin/path/";
                tblMenu.setMenuUrl(url+tblMenu.getMenuUrl());
            }
            tblMenu.setMenuType("tabAdd");
        }
        if(ConstantEnum.ConstantEnumType.INSERT.getValue().equals(tblMenu.getMethod())){
            if("0".equals(tblMenu.getMenuLevel())){
                tblMenu.setMenuSubId(0);//如果是父级菜单新增的时候，他的子id设置为0
            }
            tblMenu.setCrtPsnId(getAdminAccount());
            tblMenu.setModPsnId(getAdminAccount());
            Integer count = tblAdminMapper.addMenuInfo(tblMenu);
            if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == count) {
                return new CommonResult(500, "新增菜单失败", count,null, null,null,"1");
            }
            tblMenu.setMenuId(tblMenu.getMenuId());
            return new CommonResult(200, "新增菜单成功,您需要重新登录生效！", count,tblMenu, null,null,"0");
        }

        if(ConstantEnum.ConstantEnumType.UPDATE.getValue().equals(tblMenu.getMethod())){
            if("0".equals(tblMenu.getMenuLevel())){
                tblMenu.setMenuSubId(0);//如果是父级菜单修改的时候，他的子id设置为0
            }
            tblMenu.setModPsnId(getAdminAccount());
            Boolean flag = tblAdminMapper.updateMenuInfo(tblMenu);
            if (flag == false) {
                return new CommonResult(500, "更新菜单失败", null,tblMenu, null,null,"1");
            }
            return new CommonResult(200, "更新菜单成功,您需要重新登录生效！", null,tblMenu, null,null,"0");
        }

        if(ConstantEnum.ConstantEnumType.DELETE.getValue().equals(tblMenu.getMethod())){
            tblMenu.setModPsnId(getAdminAccount());
            Boolean flag = tblAdminMapper.deleteMenuInfo(tblMenu);
            if (flag == false) {
                return new CommonResult(500, "删除菜单失败", null,tblMenu, null,null,"1");
            }
            return new CommonResult(200, "删除菜单成功", null,tblMenu, null,null,"0");
        }

        return new CommonResult(501, "系统未能正确执行操作方法！", null,tblMenu, null,null,"1");

    }

    public CommonResult findALLRoleList(TblRole tblRole, PageListEntity pageListEntity){
        //查询角色列表
        if(ConstantEnum.ConstantEnumType.getENTITY() == pageListEntity.getPage() && ConstantEnum.ConstantEnumType.getENTITY() ==  pageListEntity.getLimit()){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblRole,null,null,"1");
        }
        Integer minpage = (pageListEntity.getPage() - 1) * pageListEntity.getLimit();
        Integer maxpage = pageListEntity.getLimit();
        pageListEntity.setPage(minpage);
        pageListEntity.setLimit(maxpage);
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblRole.getRoleName()){
            pageListEntity.setObjectOne(tblRole.getRoleName());
        }
        List<TblRole> tblRoleList = tblAdminMapper.findALLRoleList(pageListEntity);
        log.info("******查询的菜单列表是: "+tblRoleList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblRoleList.size()) {
            return new CommonResult(501, "亲，暂无相关数据", null,tblRole, tblRoleList,null,"1");
        }
        Integer count = tblAdminMapper.findALLRoleListCount(pageListEntity).intValue();
        return new CommonResult(0, null, count,null, tblRoleList,null,"0");
    }

    @Transactional
    public CommonResult protectRoleList(TblRole tblRole){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblRole.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,tblRole, null,null,"1");
        }

        if(ConstantEnum.ConstantEnumType.INSERT.getValue().equals(tblRole.getMethod())){
            tblRole.setCrtPsnId(getAdminAccount());
            tblRole.setModPsnId(getAdminAccount());
            Integer count = tblAdminMapper.addRoleInfo(tblRole);
            if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == count) {
                return new CommonResult(500, "新增角色失败", count,tblRole, null,null,"1");
            }
            tblRole.setRoleId(tblRole.getRoleId());
            return new CommonResult(200, "新增角色成功,请先分配好该角色权限再进行使用！", count,tblRole, null,null,"0");
        }

        if(ConstantEnum.ConstantEnumType.UPDATE.getValue().equals(tblRole.getMethod())){
            tblRole.setModPsnId(getAdminAccount());
            Boolean flag = tblAdminMapper.updateRoleInfo(tblRole);
            if (flag == false) {
                return new CommonResult(500, "更新角色信息失败", null,tblRole, null,null,"1");
            }
            return new CommonResult(200, "更新角色信息成功！", null,tblRole, null,null,"0");
        }

        if(ConstantEnum.ConstantEnumType.DELETE.getValue().equals(tblRole.getMethod())){
            tblRole.setModPsnId(getAdminAccount());
            Boolean flag = tblAdminMapper.deleteRoleInfo(tblRole);
            if (flag == false) {
                return new CommonResult(500, "删除角色信息失败", null,tblRole, null,null,"1");
            }
            return new CommonResult(200, "删除角色信息成功", null,tblRole, null,null,"0");
        }
        return new CommonResult(501, "系统未能正确执行操作方法！", null,tblRole, null,null,"1");
    }

    public CommonResult findMenuPwr(TblAdmin tblAdmin){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblAdmin.getAdminRole() && ConstantEnum.ConstantEnumType.getENTITY() ==  tblAdmin.getAdminRole()){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblAdmin,null,null,"1");
        }
        List<MenuTreeInfo> menuTreeInfoList1 = tblAdminMapper.findMenuPwr();
        List<MenuTreeInfo> menuTreeInfoList2 = tblAdminMapper.findTreeMenuByRoleID(tblAdmin);
        Map menuMap = new LinkedHashMap();
        menuMap.put("menu", menuTreeInfoList1);
        menuMap.put("mid", menuTreeInfoList2);
        return new CommonResult(200, "查询菜单成功", null,tblAdmin,null,menuMap,"0");
    }

    @Transactional
    public CommonResult protectMenuPwr(TbleMenuRole tbleMenuRole){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tbleMenuRole.getAdminRole() && ConstantEnum.ConstantEnumType.getENTITY() ==  tbleMenuRole.getAdminRole()){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tbleMenuRole,null,null,"1");
        }
        Boolean flag = null;
        List fatherNodeId = tbleMenuRole.getFatherNodeId();//父菜单id
        List sonNodeId = tbleMenuRole.getSonNodeId();//子菜单id
        List roleMenuTableList = new ArrayList<>();
        roleMenuTableList.addAll(fatherNodeId);
        roleMenuTableList.addAll(sonNodeId);
        List<Map<String, Integer>> list = new ArrayList();
        for (int i = 0; i < roleMenuTableList.size(); i++) {
            Map<String, Integer> menuMap = new LinkedHashMap();
            Integer menuId = Double.valueOf(roleMenuTableList.get(i).toString()).intValue();
            menuMap.put("roleId", Integer.valueOf(tbleMenuRole.getAdminRole()));
            menuMap.put("menuId", menuId);
            menuMap.put("crtPsnId", Integer.valueOf(getAdminAccount()));
            menuMap.put("modPsnId", Integer.valueOf(getAdminAccount()));
            list.add(menuMap);
        }
        tblAdminMapper.updateMenuId(Integer.valueOf(tbleMenuRole.getAdminRole()));
        flag = tblAdminMapper.updateMenuPwr(list);
        if(!flag){
            return new CommonResult(501,"权限配置失败！",null,tbleMenuRole,null,null,"1");
        }
        return new CommonResult(200,"权限配置成功，请重新登录系统后生效！",null,tbleMenuRole,null,null,"0");
    }

    public CommonResult findALLUserList(TblUser tblUser, PageListEntity pageListEntity){
        //查询角色列表
        if(ConstantEnum.ConstantEnumType.getENTITY() == pageListEntity.getPage() && ConstantEnum.ConstantEnumType.getENTITY() ==  pageListEntity.getLimit()){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblUser,null,null,"1");
        }
        Integer minpage = (pageListEntity.getPage() - 1) * pageListEntity.getLimit();
        Integer maxpage = pageListEntity.getLimit();
        pageListEntity.setPage(minpage);
        pageListEntity.setLimit(maxpage);

        if(ConstantEnum.ConstantEnumType.getENTITY() != tblUser.getUserAccount()){
            pageListEntity.setObjectOne(tblUser.getUserAccount());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblUser.getUserName()){
            pageListEntity.setObjectTwo(tblUser.getUserName());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblUser.getUserPhone()){
            pageListEntity.setObjectThree(tblUser.getUserPhone());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblUser.getUserStatus()){
            pageListEntity.setObjectFour(tblUser.getUserStatus());
        }
        List<TblUser> tblUserList = tblAdminMapper.findALLUserList(pageListEntity);
        log.info("******查询的用户列表是: "+tblUserList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblUserList.size()) {
            return new CommonResult(0, "亲，暂无相关数据", null,tblUser, tblUserList,null,"1");
        }
        Integer count = tblAdminMapper.findALLUserListCount(pageListEntity).intValue();
        return new CommonResult(0, null, count,tblUser, tblUserList,null,"0");
    }

    @Transactional
    public CommonResult protectUserList(TblUser tblUser){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblUser.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,tblUser, null,null,"1");
        }
        if(ConstantEnum.ConstantEnumType.UPDATE.getValue().equals(tblUser.getMethod())){
            if("0".equals(tblUser.getUserStatus())){
                tblUser.setUserStatus("1");
            }else{
                tblUser.setUserStatus("0");
            }
            tblUser.setModPsnId(getAdminAccount());
            Boolean flag = tblAdminMapper.updateUserInfo(tblUser);
            if (flag == false) {
                return new CommonResult(500, "更新用户信息失败", null,tblUser, null,null,"1");
            }
            return new CommonResult(200, "更新用户信息成功！", null,tblUser, null,null,"0");
        }

        if(ConstantEnum.ConstantEnumType.DELETE.getValue().equals(tblUser.getMethod())){
            tblUser.setModPsnId(getAdminAccount());
            Boolean flag = tblAdminMapper.deleteUserInfo(tblUser);
            if (flag == false) {
                return new CommonResult(500, "删除用户信息失败", null,tblUser, null,null,"1");
            }
            return new CommonResult(200, "删除用户信息成功", null,tblUser, null,null,"0");
        }

        return new CommonResult(501, "系统未能正确执行操作方法！", null,tblUser, null,null,"1");
    }

    public CommonResult findALLAdminList(TblAdmin tblAdmin, PageListEntity pageListEntity){
        //查询管理员列表
        if(ConstantEnum.ConstantEnumType.getENTITY() == pageListEntity.getPage() && ConstantEnum.ConstantEnumType.getENTITY() ==  pageListEntity.getLimit()){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblAdmin,null,null,"1");
        }
        Integer minpage = (pageListEntity.getPage() - 1) * pageListEntity.getLimit();
        Integer maxpage = pageListEntity.getLimit();
        pageListEntity.setPage(minpage);
        pageListEntity.setLimit(maxpage);

        if(ConstantEnum.ConstantEnumType.getENTITY() != tblAdmin.getAdminAccount()){
            pageListEntity.setObjectOne(tblAdmin.getAdminAccount());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblAdmin.getAdminName()){
            pageListEntity.setObjectTwo(tblAdmin.getAdminName());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblAdmin.getAdminPhone()){
            pageListEntity.setObjectThree(tblAdmin.getAdminPhone());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblAdmin.getAdminStatus()){
            pageListEntity.setObjectFour(tblAdmin.getAdminStatus());
        }
        List<TblAdmin> tblAdminList = tblAdminMapper.findALLAdminList(pageListEntity);
        log.info("******查询的管理员列表是: "+tblAdminList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblAdminList.size()) {
            return new CommonResult(0, "亲，暂无相关数据", null,tblAdmin, tblAdminList,null,"1");
        }
        Integer count = tblAdminMapper.findALLAdminListCount(pageListEntity).intValue();
        return new CommonResult(0, null, count,tblAdmin, tblAdminList,null,"0");
    }

    @Transactional
    public CommonResult protectAdminList(TblAdmin tblAdmin){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblAdmin.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,tblAdmin, null,null,"1");
        }

        if(ConstantEnum.ConstantEnumType.INSERT.getValue().equals(tblAdmin.getMethod())){
            SimpleDateFormat date = new SimpleDateFormat("yyyyMMdd");
            tblAdmin.setAdminPwd(EntryrionUtil.getHash3(tblAdmin.getAdminPwd(),"SHA"));//密码加密
            if("1".equals(tblAdmin.getAdminRole().toString())){
                tblAdmin.setAdminAccount("10000000"+tblAdminMapper.getNextAdminID());
            }else{
                tblAdmin.setAdminAccount("20000000"+tblAdminMapper.getNextAdminID());
            }
            tblAdmin.setAdminStatus("0");
            tblAdmin.setCrtPsnId(tblAdmin.getAdminAccount());
            tblAdmin.setCrtTm(new Date());
            tblAdmin.setDelId("0");
            Integer num = tblAdminMapper.addAdminInfo(tblAdmin);
            log.info("******新增的管理员ID是: "+tblAdmin.getAdminId());
            if(Integer.valueOf(ConstantEnum.ConstantEnumType.DATABASENUM.getValue()) == num){
                return new CommonResult(500,"新增管理员信息失败",null,tblAdmin,null,null,"1");
            }
            tblAdmin.setAdminId(tblAdmin.getAdminId());
            return new CommonResult(200,"恭喜您，新增成功！请记好您的管理员账号："+tblAdmin.getAdminAccount()+"",null,tblAdmin,null,null,"0");
        }
        if(ConstantEnum.ConstantEnumType.UPDATE.getValue().equals(tblAdmin.getMethod())){
            if("0".equals(tblAdmin.getAdminStatus())){
                tblAdmin.setAdminStatus("1");
            }else{
                tblAdmin.setAdminStatus("0");
            }
            tblAdmin.setModPsnId(getAdminAccount());
            Boolean flag = tblAdminMapper.updateAdminInfo(tblAdmin);
            if (flag == false) {
                return new CommonResult(500, "更新管理员信息失败", null,tblAdmin, null,null,"1");
            }
            return new CommonResult(200, "更新管理员信息成功！", null,tblAdmin, null,null,"0");
        }

        if(ConstantEnum.ConstantEnumType.DELETE.getValue().equals(tblAdmin.getMethod())){
            tblAdmin.setModPsnId(getAdminAccount());
            Boolean flag = tblAdminMapper.deleteAdminInfo(tblAdmin);
            if (flag == false) {
                return new CommonResult(500, "删除管理员信息失败", null,tblAdmin, null,null,"1");
            }
            return new CommonResult(200, "删除管理员信息成功", null,tblAdmin, null,null,"0");
        }

        return new CommonResult(501, "系统未能正确执行操作方法！", null,tblAdmin, null,null,"1");
    }

    @Transactional
    public CommonResult protectAdminProInfo(TblAdmin tblAdmin){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblAdmin.getAdminAccount()){
            return new CommonResult(500, "更新条件不能为空，请联系开发商处理！", null,tblAdmin, null,null,"1");
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblAdmin.getAdminPwd()){
            tblAdmin.setAdminPwd(EntryrionUtil.getHash3(tblAdmin.getAdminPwd(),"SHA"));//密码加密
        }
        tblAdmin.setModPsnId(getAdminAccount());
        Boolean flag = tblAdminMapper.updateAdminProInfo(tblAdmin);
        if (flag == true) {
            return new CommonResult(200, "更新管理员信息成功", null,tblAdmin, null,null,"0");
        }
        return new CommonResult(501, "系统未能正确执行操作方法！", null,tblAdmin, null,null,"0");
    }

    @Transactional
    public CommonResult uploadAdminHeadInfo(TblAdmin tblAdmin,@RequestParam("file") MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename().toString();//得到上传时的文件名。
        Long size = file.getSize();
        Long maxsize = 512000L;
        if(size > maxsize) {
            return new CommonResult(500, "上传文件大小超过最大限制，请重新上传！", null,tblAdmin, null,null,"1");
        }
        file.transferTo(new File("D:\\Java\\smarthome\\src\\main\\resources\\static\\userHeadImg\\" + filename));//文件存放位置
        tblAdmin.setAdminHead("/userHeadImg/"+filename);
        tblAdmin.setModPsnId(getAdminAccount());
        tblAdmin.setAdminAccount(getAdminAccount());
        Boolean flag = tblAdminMapper.uploadAdminHeadInfo(tblAdmin);
        if(flag == true){
            return new CommonResult(200, "上传成功,重新登录后生效！", null,tblAdmin, null,null,"0");
        }

        return new CommonResult(501, "系统未能正确执行操作方法！", null,tblAdmin, null,null,"1");
    }

    public CommonResult findALLInfoList(TblInfo tblInfo, PageListEntity pageListEntity){
        //查询管理员列表
        if(ConstantEnum.ConstantEnumType.getENTITY() == pageListEntity.getPage() && ConstantEnum.ConstantEnumType.getENTITY() ==  pageListEntity.getLimit()){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblInfo,null,null,"1");
        }
        Integer minpage = (pageListEntity.getPage() - 1) * pageListEntity.getLimit();
        Integer maxpage = pageListEntity.getLimit();
        pageListEntity.setPage(minpage);
        pageListEntity.setLimit(maxpage);

        if(ConstantEnum.ConstantEnumType.getENTITY() != tblInfo.getInfoTitle()){
            pageListEntity.setObjectOne(tblInfo.getInfoTitle());
        }

        List<TblInfo> tblInfoList = tblAdminMapper.findALLInfoList(pageListEntity);
        log.info("******查询的管理员列表是: "+tblInfoList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblInfoList.size()) {
            return new CommonResult(0, "亲，暂无相关数据", null,tblInfo, tblInfoList,null,"1");
        }
        Integer count = tblAdminMapper.findALLInfoListCount(pageListEntity).intValue();
        return new CommonResult(0, null, count,tblInfo, tblInfoList,null,"0");
    }

    @Transactional
    public CommonResult protectInfoList(TblInfo tblInfo){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblInfo.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,tblInfo, null,null,"1");
        }
        if(ConstantEnum.ConstantEnumType.INSERT.getValue().equals(tblInfo.getMethod())){
            tblInfo.setCrtPsnId(getAdminAccount());
            tblInfo.setCrtTm(new Date());
            tblInfo.setDelId("0");
            Integer num = tblAdminMapper.addInfo(tblInfo);
            log.info("******新增的资讯ID是: "+tblInfo.getInfoId());
            if(Integer.valueOf(ConstantEnum.ConstantEnumType.DATABASENUM.getValue()) == num){
                return new CommonResult(500,"新增资讯信息失败",null,tblInfo,null,null,"1");
            }
            tblInfo.setInfoId(tblInfo.getInfoId());
            return new CommonResult(200,"新增资讯信息成功",null,tblInfo,null,null,"0");
        }
        if(ConstantEnum.ConstantEnumType.UPDATE.getValue().equals(tblInfo.getMethod())){

            tblInfo.setModPsnId(getAdminAccount());
            Boolean flag = tblAdminMapper.updateInfo(tblInfo);
            if (flag == false) {
                return new CommonResult(500, "更新资讯信息失败", null,tblInfo, null,null,"1");
            }
            return new CommonResult(200, "更新资讯信息成功！", null,tblInfo, null,null,"0");
        }
        if(ConstantEnum.ConstantEnumType.DELETE.getValue().equals(tblInfo.getMethod())){
            tblInfo.setModPsnId(getAdminAccount());
            Boolean flag = tblAdminMapper.deleteInfo(tblInfo);
            if (flag == false) {
                return new CommonResult(500, "删除资讯信息失败", null,tblInfo, null,null,"1");
            }
            return new CommonResult(200, "删除资讯信息成功", null,tblInfo, null,null,"0");
        }

        return new CommonResult(501, "系统未能正确执行操作方法！", null,tblInfo, null,null,"1");
    }


    public CommonResult findAllAccountTypeInfo(TblAccountType tblAccountType, PageListEntity pageListEntity){
        //查询账号类型列表
        if(ConstantEnum.ConstantEnumType.getENTITY() == pageListEntity.getPage() && ConstantEnum.ConstantEnumType.getENTITY() ==  pageListEntity.getLimit()){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblAccountType,null,null,"1");
        }
        Integer minpage = (pageListEntity.getPage() - 1) * pageListEntity.getLimit();
        Integer maxpage = pageListEntity.getLimit();
        pageListEntity.setPage(minpage);
        pageListEntity.setLimit(maxpage);

        if(ConstantEnum.ConstantEnumType.getENTITY() != tblAccountType.getAccountTypeId()){
            pageListEntity.setObjectOne(tblAccountType.getAccountTypeId().toString());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblAccountType.getAccountTypeNm()){
            pageListEntity.setObjectTwo(tblAccountType.getAccountTypeNm());
        }

        List<TblAccountType> tblAccountTypeList = tblAdminMapper.findAllAccountTypeInfo(pageListEntity);
        log.info("******查询的账号类型列表是: "+tblAccountTypeList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblAccountTypeList.size()) {
            return new CommonResult(0, "亲，暂无相关数据", null,tblAccountType, tblAccountTypeList,null,"1");
        }
        Integer count = tblAdminMapper.findAllAccountTypeInfoCount(pageListEntity).intValue();
        return new CommonResult(0, null, count,tblAccountType, tblAccountTypeList,null,"0");
    }

    @Transactional
    public CommonResult protectAccountTypeList(TblAccountType tblAccountType){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblAccountType.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,tblAccountType, null,null,"1");
        }
        if(ConstantEnum.ConstantEnumType.INSERT.getValue().equals(tblAccountType.getMethod())){
            tblAccountType.setCrtPsnId(getAdminAccount());
            tblAccountType.setCrtTm(new Date());
            tblAccountType.setDelId("0");
            Integer num = tblAdminMapper.addAccountType(tblAccountType);
            log.info("******新增的账号类型ID是: "+tblAccountType.getAccountTypeId());
            if(Integer.valueOf(ConstantEnum.ConstantEnumType.DATABASENUM.getValue()) == num){
                return new CommonResult(500,"新增账号类型信息失败",null,tblAccountType,null,null,"1");
            }
            tblAccountType.setAccountTypeId(tblAccountType.getAccountTypeId());
            return new CommonResult(200,"新增账号类型信息成功",null,tblAccountType,null,null,"0");
        }
        if(ConstantEnum.ConstantEnumType.UPDATE.getValue().equals(tblAccountType.getMethod())){
            tblAccountType.setModPsnId(getAdminAccount());
            Boolean flag = tblAdminMapper.updateAccountType(tblAccountType);
            if (flag == false) {
                return new CommonResult(500, "更新账号类型信息失败", null,tblAccountType, null,null,"1");
            }
            return new CommonResult(200, "更新账号类型信息成功！", null,tblAccountType, null,null,"0");
        }
        if(ConstantEnum.ConstantEnumType.DELETE.getValue().equals(tblAccountType.getMethod())){
            tblAccountType.setModPsnId(getAdminAccount());
            Boolean flag = tblAdminMapper.deleteAccountType(tblAccountType);
            if (flag == false) {
                return new CommonResult(500, "删除账号类型信息失败", null,tblAccountType, null,null,"1");
            }
            return new CommonResult(200, "删除账号类型信息成功", null,tblAccountType, null,null,"0");
        }

        return new CommonResult(501, "系统未能正确执行操作方法！", null,tblAccountType, null,null,"1");
    }


}

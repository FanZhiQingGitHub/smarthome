package com.group.sh.smarthome.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.group.sh.smarthome.entity.*;
import com.group.sh.smarthome.mapper.TblAdminMapper;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.resultbean.PageListEntity;
import com.group.sh.smarthome.util.ConstantEnum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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
public class TblAdminService extends ServiceImpl<TblAdminMapper, TblAdmin> {

    @Resource
    private TblAdminMapper tblAdminMapper;

    public String getNextAdminID() {
        return tblAdminMapper.getNextAdminID();
    }

    public TblAdmin adminLogin(TblAdmin tblAdmin){
        return tblAdminMapper.adminLogin(tblAdmin);
    }

    public List<TblAdmin> getAdminInfoList(TblAdmin tblAdmin) {
        return tblAdminMapper.getAdminInfoList(tblAdmin);
    }

    @Transactional
    public Integer addAdminInfo(TblAdmin tblAdmin) {
        return tblAdminMapper.addAdminInfo(tblAdmin);
    }

    @Transactional
    public Boolean updateAdminInfo(TblAdmin tblAdmin) {
        return tblAdminMapper.updateAdminInfo(tblAdmin);
    }

    @Transactional
    public Boolean deleteAdminInfo(TblAdmin tblAdmin) {
        return tblAdminMapper.deleteAdminInfo(tblAdmin);
    }

    public List<MenuTreeInfo> findMenuIDByRoleId(Integer roleId){
        return tblAdminMapper.findMenuIDByRoleId(roleId);
    }

    public List<TblMenu> findALLMenuList(PageListEntity pageListEntity){
        return tblAdminMapper.findALLMenuList(pageListEntity);
    }

    public Long findALLMenuListCount(PageListEntity pageListEntity){
        return tblAdminMapper.findALLMenuListCount(pageListEntity);
    }

    public List<TblMenu> findParentMenu(){
        return tblAdminMapper.findParentMenu();
    }

    @Transactional
    public Integer addMenuInfo(TblMenu tblMenu) {
        return tblAdminMapper.addMenuInfo(tblMenu);
    }

    @Transactional
    public  Boolean updateMenuInfo(TblMenu tblMenu) {
        return tblAdminMapper.updateMenuInfo(tblMenu);
    }

    @Transactional
    public  Boolean deleteMenuInfo(TblMenu tblMenu) {
        return tblAdminMapper.deleteMenuInfo(tblMenu);
    }

    public List<TblRole> findALLRoleList(PageListEntity pageListEntity){
        return tblAdminMapper.findALLRoleList(pageListEntity);
    }

    public Long findALLRoleListCount(PageListEntity pageListEntity){
        return tblAdminMapper.findALLRoleListCount(pageListEntity);
    }
    @Transactional
    public Integer addRoleInfo(TblRole tblRole){
        return tblAdminMapper.addRoleInfo(tblRole);
    }
    @Transactional
    public Boolean updateRoleInfo(TblRole tblRole){
        return tblAdminMapper.updateRoleInfo(tblRole);
    }
    @Transactional
    public Boolean deleteRoleInfo(TblRole tblRole){
        return tblAdminMapper.deleteRoleInfo(tblRole);
    }

    public List<MenuTreeInfo> findMenuPwr(){
        return tblAdminMapper.findMenuPwr();
    }

    public List<MenuTreeInfo> findTreeMenuByRoleID(TblAdmin tblAdmin){
        return tblAdminMapper.findTreeMenuByRoleID(tblAdmin);
    }

    @Transactional
    public Boolean updateMenuPwr(TbleMenuRole tbleMenuRole,String adminAccount){
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
            menuMap.put("crtPsnId", Integer.valueOf(adminAccount));
            menuMap.put("modPsnId", Integer.valueOf(adminAccount));
            list.add(menuMap);
        }
        tblAdminMapper.updateMenuId(Integer.valueOf(tbleMenuRole.getAdminRole()));
        flag = tblAdminMapper.updateMenuPwr(list);
        return flag;
    }


    public CommonResult findALLUserList(TblUser tblUser, PageListEntity pageListEntity){
        //查询角色列表
        if(ConstantEnum.ConstantEnumType.getENTITY() == pageListEntity.getPage() && ConstantEnum.ConstantEnumType.getENTITY() ==  pageListEntity.getLimit()){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblUser,null,null);
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
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblUser.getCrtTm()){
//            pageListEntity.setObjectOne(tblUser.getCrtTm());
        }

        List<TblUser> tblUserList = tblAdminMapper.findALLUserList(pageListEntity);
        log.info("******查询的用户列表是: "+tblUserList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblUserList.size()) {
            return new CommonResult(501, "亲，暂无相关数据", null,null, tblUserList,null);
        }
        Integer count = tblAdminMapper.findALLUserListCount(pageListEntity).intValue();
        return new CommonResult(0, null, count,null, tblUserList,null);
    }

    @Transactional
    public CommonResult protectUserList(TblUser tblUser,String adminAcount){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblUser.getMethod()){
            new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,null, null,null);
        }
        if(ConstantEnum.ConstantEnumType.UPDATE.getValue().equals(tblUser.getMethod())){
            tblUser.setModPsnId(adminAcount);
            Boolean flag = tblAdminMapper.updateUserInfo(tblUser);
            if (flag == false) {
                return new CommonResult(500, "更新用户信息失败", null,null, null,null);
            }
            return new CommonResult(200, "更新用户信息成功！", null,null, null,null);
        }

        if(ConstantEnum.ConstantEnumType.DELETE.getValue().equals(tblUser.getMethod())){
            tblUser.setModPsnId(adminAcount);
            Boolean flag = tblAdminMapper.deleteUserInfo(tblUser);
            if (flag == false) {
                return new CommonResult(500, "删除用户信息失败", null,null, null,null);
            }
            return new CommonResult(200, "删除用户信息成功", null,null, null,null);
        }

        return new CommonResult(501, "系统未能正确执行操作方法！", null,null, null,null);
    }


}

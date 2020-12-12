package com.group.sh.smarthome.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.group.sh.smarthome.entity.*;
import com.group.sh.smarthome.mapper.TblAdminMapper;
import com.group.sh.smarthome.resultbean.PageListEntity;
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


}

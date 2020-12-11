package com.group.sh.smarthome.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.group.sh.smarthome.entity.MenuTreeInfo;
import com.group.sh.smarthome.entity.TblAdmin;
import com.group.sh.smarthome.entity.TblMenu;
import com.group.sh.smarthome.entity.TblRole;
import com.group.sh.smarthome.mapper.TblAdminMapper;
import com.group.sh.smarthome.resultbean.PageListEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

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

    public List<MenuTreeInfo> findAllMenu(){
        return tblAdminMapper.findAllMenu();
    }

    public List<MenuTreeInfo> findTreeMenuByRoleID(TblAdmin tblAdmin){
        return tblAdminMapper.findTreeMenuByRoleID(tblAdmin);
    }


}

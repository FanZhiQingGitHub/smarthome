package com.group.sh.smarthome.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.group.sh.smarthome.entity.MenuTreeInfo;
import com.group.sh.smarthome.entity.TblAdmin;
import com.group.sh.smarthome.entity.TblMenu;
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

}

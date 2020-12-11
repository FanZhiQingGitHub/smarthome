package com.group.sh.smarthome.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.group.sh.smarthome.entity.MenuTreeInfo;
import com.group.sh.smarthome.entity.TblAdmin;
import com.group.sh.smarthome.entity.TblMenu;
import com.group.sh.smarthome.entity.TblRole;
import com.group.sh.smarthome.resultbean.PageListEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author fzq
 * @since 2020-11-26
 */
@Mapper
public interface TblAdminMapper extends BaseMapper<TblAdmin> {

    public String getNextAdminID();

    public TblAdmin adminLogin(TblAdmin tblAdmin);

    public List<TblAdmin> getAdminInfoList(TblAdmin tblAdmin);

    public Integer addAdminInfo(TblAdmin tblAdmin);

    public Boolean updateAdminInfo(TblAdmin tblAdmin);

    public Boolean deleteAdminInfo(TblAdmin tblAdmin);

    public List<MenuTreeInfo> findMenuIDByRoleId(Integer roleId);

    public List<TblMenu> findALLMenuList(PageListEntity pageListEntity);

    public Long findALLMenuListCount(PageListEntity pageListEntity);

    public List<TblMenu> findParentMenu();

    public Integer addMenuInfo(TblMenu tblMenu);

    public Boolean updateMenuInfo(TblMenu tblMenu);

    public Boolean deleteMenuInfo(TblMenu tblMenu);

    public List<TblRole> findALLRoleList(PageListEntity pageListEntity);

    public Long findALLRoleListCount(PageListEntity pageListEntity);

    public Integer addRoleInfo(TblRole tblRole);

    public Boolean updateRoleInfo(TblRole tblRole);

    public Boolean deleteRoleInfo(TblRole tblRole);

    public List<MenuTreeInfo> findMenuPwr();

    public List<MenuTreeInfo> findTreeMenuByRoleID(TblAdmin tblAdmin);

}

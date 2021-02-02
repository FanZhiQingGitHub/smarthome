package com.group.sh.smarthome.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.group.sh.smarthome.entity.*;
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

    public Boolean updateMenuId(Integer adminRole);//根据角色ID逻辑删除其拥有的菜单ID

    public Boolean updateMenuPwr(List list);//根据前台用户所分配的菜单ID 进行重新插入

    public List<TblUser> findALLUserList(PageListEntity pageListEntity);

    public Long findALLUserListCount(PageListEntity pageListEntity);

    public Boolean updateUserInfo(TblUser tblUser);

    public Boolean deleteUserInfo(TblUser tblUser);

    public List<TblAdmin> findALLAdminList(PageListEntity pageListEntity);

    public Long findALLAdminListCount(PageListEntity pageListEntity);

    public Integer addAdminInfo(TblAdmin tblAdmin);

    public Boolean updateAdminInfo(TblAdmin tblAdmin);

    public Boolean updateAdminProInfo(TblAdmin tblAdmin);

    public Boolean uploadAdminHeadInfo(TblAdmin tblAdmin);

    public Boolean deleteAdminInfo(TblAdmin tblAdmin);

    public List<TblInfo> findALLInfoList(PageListEntity pageListEntity);

    public Long findALLInfoListCount(PageListEntity pageListEntity);

    public Integer addInfo(TblInfo tblInfo);

    public Boolean updateInfo(TblInfo tblInfo);

    public Boolean deleteInfo(TblInfo tblInfo);



    public List<TblAccountType> findAllAccountTypeInfo(PageListEntity pageListEntity);

    public Long findAllAccountTypeInfoCount(PageListEntity pageListEntity);

    public Integer addAccountType(TblAccountType tblAccountType);

    public Boolean updateAccountType(TblAccountType tblAccountType);

    public Boolean deleteAccountType(TblAccountType tblAccountType);


}

package com.group.sh.smarthome.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.group.sh.smarthome.entity.TblUser;
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
public interface TblUserMapper extends BaseMapper<TblUser> {

    public List<TblUser> getUserInfoList(TblUser tblUser);

    public String addUserInfo(List<TblUser> tblUserList);

    public Boolean updateUserInfo(TblUser tblUser);

    public Boolean deleteUserInfo(TblUser tblUser);

}

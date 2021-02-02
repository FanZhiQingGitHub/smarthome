package com.group.sh.smarthome.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.group.sh.smarthome.entity.TblAccountInfo;
import com.group.sh.smarthome.entity.TblHisbill;
import com.group.sh.smarthome.entity.TblUser;
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
public interface TblUserMapper extends BaseMapper<TblUser> {

    public String getNextUserID();

    public TblUser userLogin(TblUser tblUser);

    public Integer addUserInfo(TblUser tblUser);

    public Boolean updateUserInfo(TblUser tblUser);

    public List<TblHisbill> findALLBillList(PageListEntity pageListEntity);

    public Long findALLBillListCount(PageListEntity pageListEntity);

    public Integer addBillInfo(TblHisbill tblHisbill);

    public Boolean updateBillInfo(TblHisbill tblHisbill);

    public Boolean updateBillEndTime(TblHisbill tblHisbill);

    public Boolean deleteBillInfo(TblHisbill tblHisbill);

    public Boolean uploadUserHeadInfo(TblUser tblUser);

    public List<TblAccountInfo> findALLAccountList(PageListEntity pageListEntity);

    public Long findALLAccountListCount(PageListEntity pageListEntity);

    public Integer addAccountInfo(TblAccountInfo tblAccountInfo);

    public Boolean updateAccountInfo(TblAccountInfo tblAccountInfo);

    public Boolean deleteAccountInfo(TblAccountInfo tblAccountInfo);


}

package com.group.sh.smarthome.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.group.sh.smarthome.entity.TblAdmin;
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

}

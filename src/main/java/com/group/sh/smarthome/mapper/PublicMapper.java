package com.group.sh.smarthome.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.group.sh.smarthome.entity.TblArea;
import com.group.sh.smarthome.entity.TblSyslog;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 *  Mapper 公共查询接口
 * </p>
 *
 * @author fzq
 * @since 2020-12-18
 */
@Mapper
public interface PublicMapper extends BaseMapper<TblSyslog> {

    public List<TblArea> findAreaList(TblArea tblArea);

    public Long findUserCount();

    public Long findAdminCount();

    public Long findMenuCount();

    public Long findInfoCount();

}

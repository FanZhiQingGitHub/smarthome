package com.group.sh.smarthome.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.group.sh.smarthome.entity.MenuTreeInfo;
import com.group.sh.smarthome.entity.TblArea;
import com.group.sh.smarthome.entity.TblMenu;
import com.group.sh.smarthome.entity.TblSyslog;
import com.group.sh.smarthome.resultbean.PageListEntity;
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

    public List<TblSyslog> findSystemLogInfoList(PageListEntity pageListEntity);

    public Long findSystemLogInfoListCount(PageListEntity pageListEntity);

    public Long userStatistics(String num);

    public Long adminStatistics(String num);

    public List<MenuTreeInfo> menuStatistics();

    public Long infoStatistics(String num);

    public Integer addSysLogInfo(TblSyslog tblSyslog);


}

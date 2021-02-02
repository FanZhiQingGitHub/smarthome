package com.group.sh.smarthome.mapper;

import com.group.sh.smarthome.annotation.OperationLog;
import com.group.sh.smarthome.entity.MenuTreeInfo;
import com.group.sh.smarthome.entity.TblAccountType;
import com.group.sh.smarthome.entity.TblArea;
import com.group.sh.smarthome.entity.TblInfo;
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
public interface PublicMapper {

    public List<TblArea> findAreaList(TblArea tblArea);

    public Long findUserCount();

    public Long findAdminCount();

    public Long findMenuCount();

    public Long findInfoCount();

    public Long userStatistics(String num);

    public Long adminStatistics(String num);

    public List<MenuTreeInfo> menuStatistics();

    public Long infoStatistics(String num);

    public List<OperationLog> findOperationLogList(PageListEntity pageListEntity);

    public Long findOperationLogListCount(PageListEntity pageListEntity);

    public Integer addOperationLogInfo(OperationLog operationLog);

    public List<TblInfo> findAllInfo();

    public List<TblAccountType> findAllAccountTypeInfo();


}

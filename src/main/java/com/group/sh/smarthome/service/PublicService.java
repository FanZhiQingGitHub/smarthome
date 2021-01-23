package com.group.sh.smarthome.service;

import com.group.sh.smarthome.annotation.OperationLog;
import com.group.sh.smarthome.entity.MenuTreeInfo;
import com.group.sh.smarthome.entity.TblArea;
import com.group.sh.smarthome.entity.TblInfo;
import com.group.sh.smarthome.mapper.PublicMapper;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.resultbean.PageListEntity;
import com.group.sh.smarthome.util.ConstantEnum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author fzq
 * @since 2020-12-18
 */
@Service
@Slf4j
public class PublicService {

    @Resource
    private PublicMapper publicMapper;

    public CommonResult findAreaList(TblArea tblArea){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblArea.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,tblArea, null,null);
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblArea.getAreaLvl()){
            return new CommonResult(501, "省市区层级类型不能为空，请联系开发商处理！", null,tblArea, null,null);
        }
        if(ConstantEnum.ConstantEnumType.PROVINCE.getValue().equals(tblArea.getMethod())){
            List<TblArea> tblAreaList = publicMapper.findAreaList(tblArea);
//            if(Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblAreaList.size()){
//                return new CommonResult(503, "未查到该省级行政区划", null,tblArea, tblAreaList,null);
//            }
            return new CommonResult(200, null, null,tblArea, tblAreaList,null);
        }
        if(ConstantEnum.ConstantEnumType.CITY.getValue().equals(tblArea.getMethod())){
            List<TblArea> tblAreaList = publicMapper.findAreaList(tblArea);
//            if(Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblAreaList.size()){
//                return new CommonResult(503, "未查到该市级行政区划", null,tblArea, tblAreaList,null);
//            }
            return new CommonResult(200, null, null,tblArea, tblAreaList,null);
        }
        if(ConstantEnum.ConstantEnumType.AREA.getValue().equals(tblArea.getMethod())){
            List<TblArea> tblAreaList = publicMapper.findAreaList(tblArea);
//            if(Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblAreaList.size()){
//                return new CommonResult(503, "未查到该县/区级行政区划", null,tblArea, tblAreaList,null);
//            }
            return new CommonResult(200, null, null,tblArea, tblAreaList,null);
        }
        return new CommonResult(502, "系统未能正确执行操作方法！", null,tblArea, null,null);
    }

    public CommonResult findAllCount(){
        Long userCount = publicMapper.findUserCount();
        Long adminCount = publicMapper.findAdminCount();
        Long menuCount = publicMapper.findMenuCount();
        Long infoCount = publicMapper.findInfoCount();
        Map<String,String> countMap = new LinkedHashMap<>();
        countMap.put("userCount",userCount.toString());
        countMap.put("adminCount",adminCount.toString());
        countMap.put("menuCount",menuCount.toString());
        countMap.put("infoCount",infoCount.toString());
        log.info("所查到的个统计数量为="+countMap);
        return new CommonResult(200, null, null,null, null,countMap);
    }

    public CommonResult findOperationLogList(OperationLog operationLog, PageListEntity pageListEntity){
        //查询系统操作日志列表
        if(ConstantEnum.ConstantEnumType.getENTITY() == pageListEntity.getPage() && ConstantEnum.ConstantEnumType.getENTITY() ==  pageListEntity.getLimit()){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,operationLog,null,null);
        }
        Integer minpage = (pageListEntity.getPage() - 1) * pageListEntity.getLimit();
        Integer maxpage = pageListEntity.getLimit();
        pageListEntity.setPage(minpage);
        pageListEntity.setLimit(maxpage);
        if(ConstantEnum.ConstantEnumType.getENTITY() != operationLog.getOperateUserId()){
            pageListEntity.setObjectOne(operationLog.getOperateUserId().toString());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != operationLog.getOperateUserName()){
            pageListEntity.setObjectTwo(operationLog.getOperateUserName());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != operationLog.getOperateModule()){
            pageListEntity.setObjectThree(operationLog.getOperateModule());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != operationLog.getOperateType()){
            pageListEntity.setObjectFour(operationLog.getOperateType());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != operationLog.getOperateResult()){
            pageListEntity.setObjectFive(operationLog.getOperateResult());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != operationLog.getOperateId()){
            pageListEntity.setObjectSix(operationLog.getOperateId().toString());
        }
        List<OperationLog> operationLogList = publicMapper.findOperationLogList(pageListEntity);
        log.info("******查询的系统操作日志列表是: "+operationLogList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == operationLogList.size()) {
            return new CommonResult(0, "亲，暂无相关数据", null,null, operationLogList,null);
        }
        Integer count = publicMapper.findOperationLogListCount(pageListEntity).intValue();
        return new CommonResult(0, null, count,null, operationLogList,null);
    }

    public CommonResult userStatistics(){
        Map<String,ArrayList> userMap = new LinkedHashMap<>();
        List list = new ArrayList();
        Integer num = null;
        Long count = null;
        for(int i = 1;i<=7;i++){
            num = i;
            count = publicMapper.userStatistics(num.toString());
            list.add(count);
        }
        userMap.put("userMap", (ArrayList) list);
        return new CommonResult(0, null, null,null, null,userMap);
    }

    public CommonResult adminStatistics(){
        Map<String,ArrayList> adminMap = new LinkedHashMap<>();
        List list = new ArrayList();
        Integer num = null;
        Long count = null;
        for(int i = 1;i<=7;i++){
            num = i;
            count = publicMapper.adminStatistics(num.toString());
            list.add(count);
        }
        adminMap.put("adminMap", (ArrayList) list);
        return new CommonResult(0, null, null,null, null,adminMap);
    }

    public CommonResult menuStatistics(){
        List<MenuTreeInfo> menuTreeInfoList = publicMapper.menuStatistics();
        return new CommonResult(0, null, null,null, menuTreeInfoList,null);
    }

    public CommonResult infoStatistics(){
        Map<String,ArrayList> infoMap = new LinkedHashMap<>();
        List list = new ArrayList();
        Integer num = null;
        Long count = null;
        for(int i = 1;i<=7;i++){
            num = i;
            count = publicMapper.infoStatistics(num.toString());
            list.add(count);
        }
        infoMap.put("infoMap", (ArrayList) list);
        return new CommonResult(0, null, null,null, null,infoMap);
    }

    public CommonResult addOperationLogInfo(OperationLog operationLog) throws Exception {
        Integer num = publicMapper.addOperationLogInfo(operationLog);
        return new CommonResult(0, null, num,operationLog, null,null);
    }

    public CommonResult findAllInfo(){
        List<TblInfo> infoList = publicMapper.findAllInfo();
        log.info("******查询的资讯列表是: "+infoList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == infoList.size()) {
            return new CommonResult(500, "亲，暂无相关数据", null,null, infoList,null);
        }
        return new CommonResult(200, null, null,null, infoList,null);
    }

}

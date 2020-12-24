package com.group.sh.smarthome.service;

import com.group.sh.smarthome.entity.TblArea;
import com.group.sh.smarthome.mapper.PublicMapper;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.util.ConstantEnum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
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
            if(Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblAreaList.size()){
                return new CommonResult(503, "未查到该省级行政区划", null,tblArea, tblAreaList,null);
            }
            return new CommonResult(200, null, null,tblArea, tblAreaList,null);
        }
        if(ConstantEnum.ConstantEnumType.CITY.getValue().equals(tblArea.getMethod())){
            List<TblArea> tblAreaList = publicMapper.findAreaList(tblArea);
            if(Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblAreaList.size()){
                return new CommonResult(503, "未查到该市级行政区划", null,tblArea, tblAreaList,null);
            }
            return new CommonResult(200, null, null,tblArea, tblAreaList,null);
        }
        if(ConstantEnum.ConstantEnumType.AREA.getValue().equals(tblArea.getMethod())){
            List<TblArea> tblAreaList = publicMapper.findAreaList(tblArea);
            if(Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblAreaList.size()){
                return new CommonResult(503, "未查到该县/区级行政区划", null,tblArea, tblAreaList,null);
            }
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

}

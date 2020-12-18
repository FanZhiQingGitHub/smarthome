package com.group.sh.smarthome.controller;


import com.group.sh.smarthome.entity.TblArea;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.service.PublicService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author fzq
 * @since 2020-12-18
 */
@Controller
@RequestMapping("/smarthome/public")
public class PublicController {

    @Resource
    private PublicService publicService;

    /**
     *
     * 方法描述 省市区下拉框查询
     * @date 2020-12-18
     * @param
     */
    @GetMapping(value = "/findAreaList")
    @ResponseBody
    public CommonResult findAreaList(TblArea tblArea){
        return publicService.findAreaList(tblArea);
    }

}


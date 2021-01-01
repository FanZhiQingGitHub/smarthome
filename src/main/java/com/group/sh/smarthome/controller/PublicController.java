package com.group.sh.smarthome.controller;


import com.group.sh.smarthome.entity.TblArea;
import com.group.sh.smarthome.entity.TblSyslog;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.resultbean.PageListEntity;
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

    /**
     *
     * 方法描述 后台主页及统计主页横向标签数量统计查询
     * @date 2020-12-24
     * @param
     */
    @GetMapping(value = "/findAllCount")
    @ResponseBody
    public CommonResult findAllCount(){
        return publicService.findAllCount();
    }

    /**
     *
     * 方法描述 系统日志列表查询
     * @date 2020-12-24
     * @param
     */
    @GetMapping(value = "/findSystemLogInfoList")
    @ResponseBody
    public CommonResult findSystemLogInfoList(TblSyslog tblSyslog, PageListEntity pageListEntity){
        return publicService.findSystemLogInfoList(tblSyslog,pageListEntity);
    }

    /**
     *
     * 方法描述 查询用户统计（当前周）
     * @date 2020-12-31
     * @param
     */
    @GetMapping(value = "/userStatistics")
    @ResponseBody
    public CommonResult userStatistics(){
       return publicService.userStatistics();
    }

    /**
     *
     * 方法描述 查询管理员统计（当前周）
     * @date 2020-12-31
     * @param
     */
    @GetMapping(value = "/adminStatistics")
    @ResponseBody
    public CommonResult adminStatistics(){
        return publicService.adminStatistics();
    }

    /**
     *
     * 方法描述 查询菜单统计（所有）
     * @date 2020-12-31
     * @param
     */
    @GetMapping(value = "/menuStatistics")
    @ResponseBody
    public CommonResult menuStatistics(){
        return publicService.menuStatistics();
    }

    /**
     *
     * 方法描述 查询资讯统计（当前周）
     * @date 2020-12-31
     * @param
     */
    @GetMapping(value = "/infoStatistics")
    @ResponseBody
    public CommonResult infoStatistics(){
        return publicService.infoStatistics();
    }

}


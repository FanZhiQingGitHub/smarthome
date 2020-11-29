package com.group.sh.smarthome.controller;


import com.group.sh.smarthome.entity.TblUser;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.service.TblUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author fzq
 * @since 2020-11-26
 */
@RestController
@RequestMapping("/smarthome/tbl-user")
@Slf4j
public class TblUserController {

    @Resource
    private TblUserService tblUserService;

    @GetMapping(value = "/getUserInfoList")
    public CommonResult getUserInfoList(TblUser tblUser){
        tblUser.setUserAccount("545690097");
        List<TblUser> tblUserList = tblUserService.getUserInfoList(tblUser);
        log.info("******查询的结果是: "+tblUserList);
        if(0 != tblUserList.size()){
            return new CommonResult(200,"查询数据成功",null,tblUserList);
        }else{
            return new CommonResult(404,"查询数据失败",null,tblUserList);
        }
    }

    @PostMapping(value = "/addUserInfo")
    public Integer addUserInfo(TblUser tblUser){
        tblUser.setUserAccount("3152398656");
        tblUser.setUserPwd("123456");
        tblUser.setUserName("王五");
        Integer userId = tblUserService.addUserInfo(tblUser);
        log.info("******新增的用户ID是: "+tblUser.getUserId());
        return userId;
    }

    @PostMapping(value = "/updateUserInfo")
    public Boolean updateUserInfo(TblUser tblUser){
        tblUser.setUserId(1);
        Boolean flag = tblUserService.updateUserInfo(tblUser);
        return flag;
    }

    @PostMapping(value = "/deleteUserInfo")
    public Boolean deleteUserInfo(TblUser tblUser){
        tblUser.setUserId(1);
        Boolean flag = tblUserService.deleteUserInfo(tblUser);
        return flag;
    }

}


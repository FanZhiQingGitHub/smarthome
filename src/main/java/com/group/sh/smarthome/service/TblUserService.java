package com.group.sh.smarthome.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.group.sh.smarthome.entity.TblUser;
import com.group.sh.smarthome.mapper.TblUserMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author fzq
 * @since 2020-11-26
 */
@Service
public class TblUserService extends ServiceImpl<TblUserMapper, TblUser> {

    @Resource
    private TblUserMapper tblUserMapper;

    public String getNextUserID() {
        return tblUserMapper.getNextUserID();
    }

    public List<TblUser> getUserInfoList(TblUser tblUser) {
        return tblUserMapper.getUserInfoList(tblUser);
    }

    @Transactional
    public Integer addUserInfo(TblUser tblUser) {
        return tblUserMapper.addUserInfo(tblUser);
    }

    @Transactional
    public Boolean updateUserInfo(TblUser tblUser) {
        return tblUserMapper.updateUserInfo(tblUser);
    }

    @Transactional
    public Boolean deleteUserInfo(TblUser tblUser) {
        return tblUserMapper.deleteUserInfo(tblUser);
    }

}

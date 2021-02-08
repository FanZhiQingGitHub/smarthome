package com.group.sh.smarthome.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.group.sh.smarthome.entity.TblAccountInfo;
import com.group.sh.smarthome.entity.TblHisbill;
import com.group.sh.smarthome.entity.TblUser;
import com.group.sh.smarthome.mapper.TblUserMapper;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.resultbean.PageListEntity;
import com.group.sh.smarthome.util.ConstantEnum;
import com.group.sh.smarthome.util.EntryrionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * <p>
 *  用户模块服务实现类
 * </p>
 *
 * @author fzq
 * @since 2020-11-26
 */
@Service
@Slf4j
public class TblUserService extends ServiceImpl<TblUserMapper, TblUser> {

    private HttpServletRequest getUserRequest() {
        return ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
    }

    public String getUserAccount() {
        HttpSession session = getUserRequest().getSession();
        return (String) session.getAttribute("userAccount");
    }

    public String getUserPhone() {
        HttpSession session = getUserRequest().getSession();
        return (String) session.getAttribute("userPhone");
    }

    @Resource
    private TblUserMapper tblUserMapper;

    public String returnUrl(String url){
        if(null != url){
            if(url.equals("adminExit")){
                url = "adminLogin";
                return "adminhtml/"+url;
            }
            return "userhtml/"+url;
        }
        return "userhtml/404";
    }

    /**
     *
     * 方法描述 用户登录方法
     * @date 2020-11-26
     * @param tblUser
     */
    public CommonResult userLogin(TblUser tblUser){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblUser) {
            return new CommonResult(500, "请求参数为null，请联系开发商！", null,tblUser, null,null,"1");
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblUser.getUserPwd()) {
            tblUser.setUserPwd(EntryrionUtil.getHash3(tblUser.getUserPwd(),"SHA"));
        }
        TblUser User = tblUserMapper.userLogin(tblUser);
        log.info("******查询的结果是: " + User);
        if(ConstantEnum.ConstantEnumType.getENTITY() == User) {
            return new CommonResult(500, "账号或密码错误，请重新输入！多次输入不正确，请联系管理员处理！", null,tblUser, null,null,"1");
        }
        if(ConstantEnum.ConstantEnumType.STATUSNUM.getValue().equals(User.getUserStatus()) || ConstantEnum.ConstantEnumType.CONSTANT == User.getUserStatus()){
            return new CommonResult(501, "该用户禁止登录，请联系管理员处理！", null,User, null,null,"1");
        }
        if(ConstantEnum.ConstantEnumType.DELETENUM.getValue().equals(User.getDelId()) || ConstantEnum.ConstantEnumType.CONSTANT == User.getDelId()){
            return new CommonResult(502, "该用户不存在，请先进行注册！", null,User, null,null,"1");
        }
        HttpSession session = getUserRequest().getSession();
        session.setAttribute("userAccount",User.getUserAccount());
        session.setAttribute("userName",User.getUserName());
        session.setAttribute("userPhone",User.getUserPhone());
        session.setMaxInactiveInterval(30 * 60);//session过期时间设置，以秒为单位，即在没有活动30分钟后，session将失效
        return new CommonResult(200, "欢迎您："+User.getUserName()+" ，登录成功！", null,User, null,null,"0");
    }

    /**
     *
     * 方法描述 用户注册方法
     * @date 2021-02-01
     * @param tblUser
     */
    @Transactional
    public CommonResult userReg(TblUser tblUser){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblUser.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,tblUser, null,null,"1");
        }
        if(ConstantEnum.ConstantEnumType.INSERT.getValue().equals(tblUser.getMethod())){
            SimpleDateFormat date = new SimpleDateFormat("yyyyMMdd");
            tblUser.setUserPwd(EntryrionUtil.getHash3(tblUser.getUserPwd(),"SHA"));//密码加密
            tblUser.setUserAccount("30000000"+tblUserMapper.getNextUserID());
            tblUser.setUserStatus("0");
            tblUser.setCrtPsnId(tblUser.getUserAccount());
            tblUser.setCrtTm(new Date());
            tblUser.setDelId("0");
            tblUser.setUserHeadurl("/userHeadImg/userface4.jpg");
            tblUser.setUserSex("2");
            Integer num = tblUserMapper.addUserInfo(tblUser);
            log.info("******新增的管理员ID是: "+tblUser.getUserId());
            if(Integer.valueOf(ConstantEnum.ConstantEnumType.DATABASENUM.getValue()) == num){
                return new CommonResult(500,"新增用户信息失败",null,tblUser,null,null,"1");
            }
            tblUser.setUserId(tblUser.getUserId());
            HttpSession session = getUserRequest().getSession();
            session.setAttribute("userAccount",tblUser.getUserAccount());
            session.setAttribute("userName",tblUser.getUserName());
            return new CommonResult(200,"恭喜您，注册成功！请记好您的用户账号："+tblUser.getUserAccount()+"",null,tblUser,null,null,"0");
        }
        return new CommonResult(501, "系统未能正确执行操作方法！", null,tblUser, null,null,"1");
    }

    /**
     *
     * 方法描述 用户信息维护方法
     * @date 2021-02-01
     * @param tblUser
     */
    @Transactional
    public CommonResult protectUserInfo(TblUser tblUser){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblUser.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,tblUser, null,null,"1");
        }
        if(ConstantEnum.ConstantEnumType.INSERT.getValue().equals(tblUser.getMethod())){
            SimpleDateFormat date = new SimpleDateFormat("yyyyMMdd");
            tblUser.setUserPwd(EntryrionUtil.getHash3(tblUser.getUserPwd(),"SHA"));//密码加密
            tblUser.setUserAccount("30000000"+tblUserMapper.getNextUserID());
            tblUser.setUserStatus("0");
            tblUser.setCrtPsnId(tblUser.getUserAccount());
            tblUser.setCrtTm(new Date());
            tblUser.setDelId("0");
            tblUser.setUserHeadurl("/userHeadImg/userface4.jpg");
            tblUser.setUserSex("2");
            Integer num = tblUserMapper.addUserInfo(tblUser);
            log.info("******新增的管理员ID是: "+tblUser.getUserId());
            if(Integer.valueOf(ConstantEnum.ConstantEnumType.DATABASENUM.getValue()) == num){
                return new CommonResult(500,"新增用户信息失败",null,tblUser,null,null,"1");
            }
            tblUser.setUserId(tblUser.getUserId());
            return new CommonResult(200,"恭喜您，注册成功！请记好您的用户账号："+tblUser.getUserAccount()+"",null,tblUser,null,null,"0");
        }
        if(ConstantEnum.ConstantEnumType.UPDATE.getValue().equals(tblUser.getMethod())){
            tblUser.setModPsnId(getUserAccount());
            if(ConstantEnum.ConstantEnumType.getENTITY() != tblUser.getUserPwd()){
                tblUser.setUserPwd(EntryrionUtil.getHash3(tblUser.getUserPwd(),"SHA"));//密码加密
            }
            Boolean flag = tblUserMapper.updateUserInfo(tblUser);
            if (flag == false) {
                return new CommonResult(500, "更新用户信息失败", null,tblUser, null,null,"1");
            }
            return new CommonResult(200, "更新用户信息成功", null,tblUser, null,null,"0");
        }

        return new CommonResult(501, "系统未能正确执行操作方法！", null,tblUser, null,null,"1");
    }

    @Transactional
    public CommonResult uploadUserHeadInfo(TblUser tblUser, @RequestParam("file") MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename().toString();//得到上传时的文件名。
        Long size = file.getSize();
        Long maxsize = 512000L;
        if(size > maxsize) {
            return new CommonResult(500, "上传文件大小超过最大限制，请重新上传！", null,tblUser, null,null,"1");
        }
        file.transferTo(new File("D:\\Java\\smarthome\\src\\main\\resources\\static\\userHeadImg\\" + filename));//文件存放位置
        tblUser.setUserHeadurl("/userHeadImg/"+filename);
        tblUser.setModPsnId(getUserAccount());
        tblUser.setUserAccount(getUserAccount());
        Boolean flag = tblUserMapper.uploadUserHeadInfo(tblUser);
        if(flag == true){
            return new CommonResult(200, "上传成功,重新登录后生效！", null,tblUser, null,null,"0");
        }
        return new CommonResult(501, "系统未能正确执行操作方法！", null,tblUser, null,null,"1");
    }

    /**
     *
     * 方法描述 用户账单列表查询
     * @date 2021-02-01
     * @param tblHisbill
     */
    public CommonResult findALLBillList(TblHisbill tblHisbill, PageListEntity pageListEntity){
        if(ConstantEnum.ConstantEnumType.getENTITY() == pageListEntity.getPage() && ConstantEnum.ConstantEnumType.getENTITY() ==  pageListEntity.getLimit()){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblHisbill,null,null,"1");
        }
        Integer minpage = (pageListEntity.getPage() - 1) * pageListEntity.getLimit();
        Integer maxpage = pageListEntity.getLimit();
        pageListEntity.setPage(minpage);
        pageListEntity.setLimit(maxpage);
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblHisbill.getHisbillId()){
            pageListEntity.setObjectOne(tblHisbill.getHisbillId().toString());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblHisbill.getHisbillName()){
            pageListEntity.setObjectTwo(tblHisbill.getHisbillName());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblHisbill.getHisbillMen()){
            pageListEntity.setObjectThree(tblHisbill.getHisbillMen());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblHisbill.getHisbillMenphone()){
            pageListEntity.setObjectFour(tblHisbill.getHisbillMenphone());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblHisbill.getHisbillType()){
            pageListEntity.setObjectFive(tblHisbill.getHisbillType());
        }
        pageListEntity.setAccount(getUserAccount());
        List<TblHisbill> tblHisbillList = tblUserMapper.findALLBillList(pageListEntity);
        log.info("******查询的账单列表是: "+tblHisbillList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblHisbillList.size()) {
            return new CommonResult(0, "亲，暂无相关数据", null,tblHisbill, tblHisbillList,null,"1");
        }
        Integer count = tblUserMapper.findALLBillListCount(pageListEntity).intValue();
        return new CommonResult(0, null, count,tblHisbill, tblHisbillList,null,"0");
    }


    /**
     *
     * 方法描述 账单信息维护方法
     * @date 2021-02-01
     * @param tblHisbill
     */
    @Transactional
    public CommonResult protectBillList(TblHisbill tblHisbill){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblHisbill.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,tblHisbill, null,null,"1");
        }

        if(ConstantEnum.ConstantEnumType.INSERT.getValue().equals(tblHisbill.getMethod())){
            tblHisbill.setCrtPsnId(getUserAccount());
            tblHisbill.setModPsnId(getUserAccount());
            Integer count = tblUserMapper.addBillInfo(tblHisbill);
            if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == count) {
                return new CommonResult(500, "新增账单失败", count,tblHisbill, null,null,"1");
            }
            tblHisbill.setHisbillId(tblHisbill.getHisbillId());
            return new CommonResult(200, "新增账单成功！", count,tblHisbill, null,null,"0");
        }

        if(ConstantEnum.ConstantEnumType.UPDATE.getValue().equals(tblHisbill.getMethod())){
            tblHisbill.setModPsnId(getUserAccount());
            if("0".equals(tblHisbill.getHisbillStatus())){
                tblUserMapper.updateBillEndTime(tblHisbill);//如果是已结状态则修改还款时间为当前时间
            }
            Boolean flag = tblUserMapper.updateBillInfo(tblHisbill);
            if (flag == false) {
                return new CommonResult(500, "更新账单信息失败", null,tblHisbill, null,null,"1");
            }
            return new CommonResult(200, "更新账单信息成功", null,tblHisbill, null,null,"0");
        }

        if(ConstantEnum.ConstantEnumType.DELETE.getValue().equals(tblHisbill.getMethod())){
            tblHisbill.setModPsnId(getUserAccount());
            Boolean flag = tblUserMapper.deleteBillInfo(tblHisbill);
            if (flag == false) {
                return new CommonResult(500, "删除账单失败", null,tblHisbill, null,null,"1");
            }
            return new CommonResult(200, "删除账单成功", null,tblHisbill, null,null,"0");
        }
        return new CommonResult(501, "系统未能正确执行操作方法！", null,tblHisbill, null,null,"1");
    }

    /**
     *
     * 方法描述 用户账账号密码列表查询
     * @date 2021-02-02
     * @param tblAccountInfo
     */
    public CommonResult findALLAccountList(TblAccountInfo tblAccountInfo, PageListEntity pageListEntity){
        if(ConstantEnum.ConstantEnumType.getENTITY() == pageListEntity.getPage() && ConstantEnum.ConstantEnumType.getENTITY() ==  pageListEntity.getLimit()){
            return new CommonResult(500,"请求参数为null，请联系开发商！",null,tblAccountInfo,null,null,"1");
        }
        Integer minpage = (pageListEntity.getPage() - 1) * pageListEntity.getLimit();
        Integer maxpage = pageListEntity.getLimit();
        pageListEntity.setPage(minpage);
        pageListEntity.setLimit(maxpage);
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblAccountInfo.getAccountNum()){
            pageListEntity.setObjectOne(tblAccountInfo.getAccountNum());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblAccountInfo.getAccountNm()){
            pageListEntity.setObjectTwo(tblAccountInfo.getAccountNm());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblAccountInfo.getAccountPhone()){
            pageListEntity.setObjectThree(tblAccountInfo.getAccountPhone());
        }
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblAccountInfo.getAccountType()){
            pageListEntity.setObjectFour(tblAccountInfo.getAccountType());
        }
        pageListEntity.setAccount(getUserAccount());
        List<TblAccountInfo> tblAccountInfoList = tblUserMapper.findALLAccountList(pageListEntity);
        log.info("******查询的账号密码列表是: "+tblAccountInfoList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblAccountInfoList.size()) {
            return new CommonResult(0, "亲，暂无相关数据", null,tblAccountInfo, tblAccountInfoList,null,"1");
        }
        Integer count = tblUserMapper.findALLAccountListCount(pageListEntity).intValue();
        return new CommonResult(0, null, count,tblAccountInfo, tblAccountInfoList,null,"0");
    }


    /**
     *
     * 方法描述 用户账号密码信息维护方法
     * @date 2021-02-02
     * @param tblAccountInfo
     */
    @Transactional
    public CommonResult protectAccountList(TblAccountInfo tblAccountInfo){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblAccountInfo.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,tblAccountInfo, null,null,"1");
        }

        if(ConstantEnum.ConstantEnumType.INSERT.getValue().equals(tblAccountInfo.getMethod())){
            tblAccountInfo.setCrtPsnId(getUserAccount());
            tblAccountInfo.setModPsnId(getUserAccount());
            Integer count = tblUserMapper.addAccountInfo(tblAccountInfo);
            if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == count) {
                return new CommonResult(500, "新增账号数据失败", count,tblAccountInfo, null,null,"1");
            }
            tblAccountInfo.setAccountId(tblAccountInfo.getAccountId());
            return new CommonResult(200, "新增账号数据成功！", count,tblAccountInfo, null,null,"0");
        }

        if(ConstantEnum.ConstantEnumType.UPDATE.getValue().equals(tblAccountInfo.getMethod())){
            tblAccountInfo.setModPsnId(getUserAccount());
            Boolean flag = tblUserMapper.updateAccountInfo(tblAccountInfo);
            if (flag == false) {
                return new CommonResult(500, "更新账号密码信息失败", null,tblAccountInfo, null,null,"1");
            }
            return new CommonResult(200, "更新账号密码信息成功", null,tblAccountInfo, null,null,"0");
        }

        if(ConstantEnum.ConstantEnumType.DELETE.getValue().equals(tblAccountInfo.getMethod())){
            tblAccountInfo.setModPsnId(getUserAccount());
            Boolean flag = tblUserMapper.deleteAccountInfo(tblAccountInfo);
            if (flag == false) {
                return new CommonResult(500, "删除账号密码信息失败", null,tblAccountInfo, null,null,"1");
            }
            return new CommonResult(200, "删除账号密码信息成功", null,tblAccountInfo, null,null,"0");
        }
        return new CommonResult(501, "系统未能正确执行操作方法！", null,tblAccountInfo, null,null,"1");
    }

    /**
     *
     * 方法描述 重置用户密码
     * @date 2021-02-02
     * @param tblUser
     */
    @Transactional
    public CommonResult resetUserPassword(TblUser tblUser){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblUser.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,tblUser, null,null,"1");
        }
        tblUser.setModPsnId(tblUser.getUserAccount());
        tblUser.setUserPwd(EntryrionUtil.getHash3("123456","SHA"));//密码加密
        Boolean flag = tblUserMapper.resetUserPassword(tblUser);
        if (flag == false) {
            return new CommonResult(500, "重置失败，请确认所填写得账号及关联手机号码是否有误！", null,tblUser, null,null,"1");
        }
        HttpSession session = getUserRequest().getSession();
        session.setAttribute("userAccount",tblUser.getUserAccount());
        return new CommonResult(200, "您的密码重置成功，新密码为：'123456'", null,tblUser, null,null,"0");
    }

}

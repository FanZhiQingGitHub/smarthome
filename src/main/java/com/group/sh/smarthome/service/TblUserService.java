package com.group.sh.smarthome.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
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
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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

    @Resource
    private TblUserMapper tblUserMapper;

    public String returnUrl(String url){
        if(null != url){
            if("userExit".equals(url)){
                url = "userLogin";
                return "userhtml/"+url;
            }else {
                return "userhtml/"+url;
            }
        }
        return null;
    }

    /**
     *
     * 方法描述 获取下一个ID
     * @date 2020-11-26
     * @param
     */
    public String getNextUserID() {
        return tblUserMapper.getNextUserID();
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
        ConstantEnum.ConstantEnumType.roleId = Integer.valueOf(User.getUserRole());
        HttpSession session = getUserRequest().getSession();
        session.setAttribute("userAccount",User.getUserAccount());
        session.setAttribute("userName",User.getUserName());
        session.setMaxInactiveInterval(30 * 60);//session过期时间设置，以秒为单位，即在没有活动30分钟后，session将失效
        return new CommonResult(200, "欢迎您："+User.getUserName()+" ，登录成功！", null,User, null,null,"0");
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
        List<TblHisbill> tblHisbillList = tblUserMapper.findALLBillList(pageListEntity);
        log.info("******查询的账单列表是: "+tblHisbillList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblHisbillList.size()) {
            return new CommonResult(0, "亲，暂无相关数据", null,tblHisbill, tblHisbillList,null,"1");
        }
        Integer count = tblUserMapper.findALLBillListCount(pageListEntity).intValue();
        return new CommonResult(0, null, count,tblHisbill, tblHisbillList,null,"0");
    }


    @Transactional
    public CommonResult protectBillList(TblHisbill tblHisbill){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblHisbill.getMethod()){
            return new CommonResult(500, "维护类型不能为空，请联系开发商处理！", null,null, null,null,"1");
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

}

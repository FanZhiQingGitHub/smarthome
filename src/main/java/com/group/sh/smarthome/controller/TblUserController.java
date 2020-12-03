package com.group.sh.smarthome.controller;


import com.group.sh.smarthome.entity.TblUser;
import com.group.sh.smarthome.resultbean.CommonResult;
import com.group.sh.smarthome.service.TblUserService;
import com.group.sh.smarthome.util.ConstantEnum;
import com.group.sh.smarthome.util.EntryrionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 * <pre>
 *      Title: 用户功能控制层
 *      Description: 对用户信息进行增删改查
 * </pre>
 * @author fzq
 * @version 1.00.00
 * @since 创建日期：2020-11-26
 */
@Controller
@RequestMapping("/smarthome/tbl-user")
@Slf4j
public class TblUserController {

    private String userCode = null;

    @Resource
    private TblUserService tblUserService;

    /**
     *
     * 方法描述 用户功能界面跳转方法
     * @date 2020-11-26
     * @param path
     */
    @RequestMapping("/path/{url}")
    public String showView(@PathVariable(value = "url") String path) {
        return "userPage/userHtml/" + path;
    }

    /**
     *
     * 方法描述 用户登录功能验证码
     * @date 2020-11-26
     * @param
     */
    @RequestMapping(value = "/loginCode")
    public void cherkCode(HttpServletRequest request, HttpServletResponse response) {
        try {
            int width = 60;
            int height = 30;
            //String data = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";    //随机字符字典，其中0，o，1，I 等难辨别的字符最好不要
            String data = "0123456789";
            Random random = new Random();//随机类
            //1 创建图片数据缓存区域（核心类）
            BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);//创建一个彩色的图片
            //2 获得画板(图片，ps图层)，绘画对象。
            Graphics g = image.getGraphics();
            //3 选择颜色，画矩形3，4步是画一个有内外边框的效果
            g.setColor(Color.BLACK);
            g.fillRect(0, 0, width, height);
            //4白色矩形
            g.setColor(Color.WHITE);
            g.fillRect(1, 1, width - 2, height - 2);
            /**1 提供缓存区域，为了存放4个随机字符，以便存入session */
            StringBuilder builder = new StringBuilder();
            //5 随机生成4个字符
            //设置字体颜色
            g.setFont(new Font("宋体", Font.BOLD & Font.ITALIC, 20));
            for (int i = 0; i < 4; i++) {
                //随机颜色
                g.setColor(new Color(random.nextInt(255), random.nextInt(255), random.nextInt(255)));
                //随机字符
                int index = random.nextInt(data.length());
                String str = data.substring(index, index + 1);
                /**2 缓存*/
                builder.append(str);
                //写入
                g.drawString(str, (width / 6) * (i + 1), 20);
            }
            //给图中绘制噪音点，让图片不那么好辨别
            for (int j = 0, n = random.nextInt(100); j < n; j++) {
                g.setColor(Color.RED);
                g.fillRect(random.nextInt(width), random.nextInt(height), 1, 1);//随机噪音点
            }
            /**3 获得随机数据，并保存session*/
            userCode = builder.toString();
            request.getSession().setAttribute("userCode", userCode);
            //.. 生成图片发送到浏览器 --相当于下载
            ImageIO.write(image, "jpg", response.getOutputStream());
            response.getOutputStream().flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     *
     * 方法描述 用户登录方法
     * @date 2020-11-26
     * @param tblUser
     */
    @GetMapping(value = "/userLogin")
    @ResponseBody
    public CommonResult userLogin(TblUser tblUser){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblUser) {
            return new CommonResult(500, "请求参数为null", tblUser, null);
        }
        tblUser.setUserPwd(EntryrionUtil.getHash3(tblUser.getUserPwd(),"SHA"));
        TblUser User = tblUserService.userLogin(tblUser);
        log.info("******查询的结果是: " + User);
        if(ConstantEnum.ConstantEnumType.STATUSNUM.getValue().equals(User.getUserStatus()) || ConstantEnum.ConstantEnumType.CONSTANT == User.getUserStatus()){
            return new CommonResult(501, "该用户禁止登录，请联系管理员处理！", User, null);
        }
        if(ConstantEnum.ConstantEnumType.DELETENUM.getValue().equals(User.getUserStatus()) || ConstantEnum.ConstantEnumType.CONSTANT == User.getDelId()){
            return new CommonResult(502, "该用户不存在，请先进行注册！", User, null);
        }
        return new CommonResult(200, "欢迎您："+User.getUserName()+" ，登录成功！", User, null);
    }

    /**
     *
     * 方法描述 用户查询列表方法
     * @date 2020-11-26
     * @param tblUser
     */
    @GetMapping(value = "/getUserInfoList")
    @ResponseBody
    public CommonResult getUserInfoList(TblUser tblUser){
        if(ConstantEnum.ConstantEnumType.getENTITY() == tblUser) {
            return new CommonResult(500, "请求参数为null", tblUser, null);
        }
        List<TblUser> tblUserList = tblUserService.getUserInfoList(tblUser);
        log.info("******查询的结果是: " + tblUserList);
        if (Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue()) == tblUserList.size()) {
            return new CommonResult(501, "查询数据失败", tblUser, tblUserList);
        }
        return new CommonResult(200, "查询数据成功", tblUser, tblUserList);
    }


    /**
     *
     * 方法描述 用户注册方法
     * @date 2020-11-26
     * @param tblUser
     */
    @PostMapping(value = "/addUserInfo")
    @ResponseBody
    public CommonResult addUserInfo(TblUser tblUser){
        Integer num = null;
        if(ConstantEnum.ConstantEnumType.getENTITY() != tblUser){
            return new CommonResult(500,"请求参数为null",tblUser,null);
        }
        if(!userCode.equals(tblUser.getUserCode())){
            return new CommonResult(501,"验证码错误，请重新输入！",tblUser,null);
        }
        SimpleDateFormat date = new SimpleDateFormat("yyyyMMdd");
        tblUser.setUserPwd(EntryrionUtil.getHash3(tblUser.getUserPwd(),"SHA"));//密码加密
        tblUser.setUserAccount(date.format(new Date())+tblUserService.getNextUserID());
        tblUser.setUserStatus("0");
        tblUser.setCrtPsnId(tblUserService.getNextUserID());
        tblUser.setCrtTm(new Date());
        tblUser.setDelId("0");
        tblUser.setUserCode("0");//0--用户，1--管理员，2--超级管理员
        num = tblUserService.addUserInfo(tblUser);
        log.info("******新增的用户ID是: "+tblUser.getUserId());
        if(num < Integer.valueOf(ConstantEnum.ConstantEnumType.LISTSIZENUM.getValue())){
            return new CommonResult(404,"新增数据失败",tblUser,null);
        }
        return new CommonResult(200,"新增数据成功",tblUser,null);
    }

    /**
     *
     * 方法描述 用户信息更新方法
     * @date 2020-11-26
     * @param tblUser
     */
    @PostMapping(value = "/updateUserInfo")
    @ResponseBody
    public Boolean updateUserInfo(TblUser tblUser){
        tblUser.setUserId(1);
        Boolean flag = tblUserService.updateUserInfo(tblUser);
        return flag;
    }

    /**
     *
     * 方法描述 用户信息逻辑删除方法
     * @date 2020-11-26
     * @param tblUser
     */
    @PostMapping(value = "/deleteUserInfo")
    @ResponseBody
    public Boolean deleteUserInfo(TblUser tblUser){
        tblUser.setUserId(1);
        Boolean flag = tblUserService.deleteUserInfo(tblUser);
        return flag;
    }

}


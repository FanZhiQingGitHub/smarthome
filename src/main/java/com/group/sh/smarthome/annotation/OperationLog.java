package com.group.sh.smarthome.annotation;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 *
 * </p>
 *
 * @author fzq
 * @since 2020-11-26
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class OperationLog implements Serializable {

    private static final long serialVersionUID=1L;

    /** 日志id*/
    @TableId(value = "OPERATE_ID", type = IdType.AUTO)
    private Integer operateId;
    /** 请求参数*/
    @TableField("REQUEST_PARAM")
    private String requestParam;
    /** 请求头参数 */
    @TableField("HEADER_PARAM")
    private String headerParam;
    /** 请求方法名 */
    @TableField("OPERATE_METHOD")
    private String operateMethod;
    /** 操作用户ID */
    @TableField("OPERATE_USER_ID")
    private Integer operateUserId;
    /** 操作用户名 */
    @TableField("OPERATE_USER_NAME")
    private String operateUserName;
    /** 请求URI(如/test/add) */
    @TableField("OPERATE_URI")
    private String operateUri;
    /** 请求IP */
    @TableField("OPERATE_IP")
    private String operateIp;
    /** 操作模块 */
    @TableField("OPERATE_MODULE")
    private String operateModule;
    /** 请求类型(GET/POST/PUT/DELETE) */
    @TableField("OPERATE_TYPE")
    private String operateType;
    /** 操作描述 */
    @TableField("OPERATE_DESC")
    private String operateDesc;
    /** 返回结果 */
    @TableField("OPERATE_RESPONSE_PARAM")
    private String operateResponseParam;
    /** 日记记录是否正常（0-正常，1-异常） */
    @TableField("OPERATE_RESULT")
    private String operateResult;

    /** 创建时间*/
    @TableField("CRT_TM")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern ="yyyy-MM-dd")
    private Date crtTm;
    /** 删除标识*/
    @TableField("DEL_ID")
    private String delId;
    /*
     *用于区分查询菜单是查询列表还是下拉框
     * 0--新增
     * 1--修改
     * 2--删除
     * 3--查看详情
     * 未发送method值的为查列表
     */
    private String method;
}

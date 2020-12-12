package com.group.sh.smarthome.entity;

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
import java.util.List;

/**
 * <p>
 *      角色菜单关系信息类
 * </p>
 *
 * @author fzq
 * @since 2020-12-6
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TbleMenuRole implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 角色菜单id
     */
    @TableId(value = "ROLE_MENU_ID", type = IdType.AUTO)
    private Integer roleMenuId;

    /**
     * 角色id
     */
    @TableField("ROLE_ID")
    private Integer roleId;

    /**
     * 菜单id
     */
    @TableField("MENU_ID")
    private Integer menuId;


    /**
     * 创建人id
     */
    @TableField("CRT_PSN_ID")
    private String crtPsnId;

    /**
     * 创建时间
     */
    @TableField("CRT_TM")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern ="yyyy-MM-dd")
    private Date crtTm;

    /**
     * 修改人id
     */
    @TableField("MOD_PSN_ID")
    private String modPsnId;

    /**
     * 修改时间
     */
    @TableField("MOD_TM")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern ="yyyy-MM-dd")
    private Date modTm;

    /**
     * 删除标识
     */
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

    private List fatherNodeId;
    private List sonNodeId;
    private String adminRole;

}

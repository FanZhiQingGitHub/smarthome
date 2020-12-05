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
public class TblRole implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 角色id
     */
    @TableId(value = "ROLE_ID", type = IdType.AUTO)
    private Integer roleId;

    /**
     * 角色名称
     */
    @TableField("ROLE_NAME")
    private String roleName;

    /**
     * 创建人
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
     * 修改人
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


}

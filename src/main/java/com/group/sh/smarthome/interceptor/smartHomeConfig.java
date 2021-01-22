package com.group.sh.smarthome.interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class smartHomeConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册拦截器
        smartHomeInterceptor smartHomeInterceptor = new smartHomeInterceptor();
        InterceptorRegistration loginRegistry = registry.addInterceptor(smartHomeInterceptor);
        // 拦截路径
        loginRegistry.addPathPatterns("/**");
        // 排除路径
        loginRegistry.excludePathPatterns("/smarthome/admin/path/adminLogin");
        loginRegistry.excludePathPatterns("/smarthome/admin/adminLogin");
        loginRegistry.excludePathPatterns("/smarthome/user/path/userLogin");
        loginRegistry.excludePathPatterns("/smarthome/user/userLogin");
        loginRegistry.excludePathPatterns("/favicon.ico");
        loginRegistry.excludePathPatterns("/admincss/**");
        loginRegistry.excludePathPatterns("/adminjs/**");
        loginRegistry.excludePathPatterns("/layui/**");
        loginRegistry.excludePathPatterns("/publicimage/**");
        loginRegistry.excludePathPatterns("/publicjs/**");
        loginRegistry.excludePathPatterns("/usercss/**");
        loginRegistry.excludePathPatterns("/userHeadImg/**");
        loginRegistry.excludePathPatterns("/userjs/**");
        loginRegistry.excludePathPatterns("/adminhtml/**");
        loginRegistry.excludePathPatterns("/userhtml/**");
        loginRegistry.excludePathPatterns("/errorhtml/**");

    }
}

package com.group.sh.smarthome.interceptor;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class smartHomeConfig extends WebMvcConfigurerAdapter implements ApplicationContextAware {

    @SuppressWarnings("unused")
    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new smartHomeInterceptor()).addPathPatterns("/**")
        .excludePathPatterns("/smarthome/admin/path/adminLogin","/smarthome/admin/adminLogin","/favicon.ico"
                ,"/admincss/**","/adminjs/**","/layui/**","/publicimage/**","/publicjs/**","/usercss/**"
                ,"/userHeadImg/**","/userjs/**","/smarthome/admin/path/adminNavigation","/smarthome/admin/path/adminMain"
                ,"/smarthome/public/path/adminMain"
                );
    }
}

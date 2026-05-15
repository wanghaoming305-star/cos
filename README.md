# 星愿摄影 - 二次元摄影预约网站

一个面向二次元摄影师的作品展示和预约网站，使用 Next.js 14 + Supabase + Tailwind CSS 构建。

## 功能特性

✨ **作品展示**
- 响应式作品画廊
- 作品详情页
- 标签分类

📅 **预约系统**
- 简洁的预约表单
- 日期时间选择
- 备注功能

🔧 **管理后台**
- 作品上传和管理
- 预约状态管理
- 数据统计概览

🎨 **设计特色**
- 粉紫色渐变主题
- 霓虹光效
- 深色/浅色模式切换
- 毛玻璃效果

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **后端服务**: Supabase (Auth + Database + Storage)
- **状态管理**: React Hooks
- **图标**: lucide-react

## 快速开始

### 1. 克隆项目

```bash
cd cos
```

### 2. 安装依赖

```bash
npm install
```

### 3. 设置 Supabase

#### 3.1 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com) 并创建新项目
2. 等待项目初始化完成

#### 3.2 配置数据库

在 Supabase Dashboard 中，进入 SQL Editor，执行以下 SQL：

```sql
-- 创建作品表
CREATE TABLE public.works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  image_url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 创建预约表
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  notes TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 创建索引
CREATE INDEX idx_works_user_id ON public.works(user_id);
CREATE INDEX idx_works_created_at ON public.works(created_at DESC);
CREATE INDEX idx_bookings_booking_date ON public.bookings(booking_date DESC);
CREATE INDEX idx_bookings_status ON public.bookings(status);

-- 启用 RLS
ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 作品 RLS 策略
CREATE POLICY "Everyone can read works" ON public.works
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert works" ON public.works
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update own works" ON public.works
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete own works" ON public.works
  FOR DELETE USING (auth.uid() = user_id);

-- 预约 RLS 策略
CREATE POLICY "Everyone can insert bookings" ON public.bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Everyone can read bookings" ON public.bookings
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update bookings" ON public.bookings
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete bookings" ON public.bookings
  FOR DELETE USING (auth.role() = 'authenticated');
```

#### 3.3 配置存储

在 Supabase Dashboard 中：

**步骤 1：创建存储桶**
1. 进入 **Storage** 页面
2. 点击 **New bucket** 创建新存储桶
3. 名称设为 `works`
4. 选择 **Public bucket**（公开访问）
5. 点击 **Create bucket**

**步骤 2：添加存储策略（二选一）**

**选项 A：通过 SQL Editor（推荐）**
1. 点击侧边栏的 **SQL Editor**
2. 点击 **New query**
3. 复制粘贴以下 SQL 并运行：

```sql
-- 允许所有人读取 works 桶中的文件
CREATE POLICY "Everyone can read works" ON storage.objects
  FOR SELECT USING (bucket_id = 'works');

-- 允许认证用户上传到 works 桶
CREATE POLICY "Authenticated users can upload works" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'works' AND auth.role() = 'authenticated');

-- 允许认证用户删除自己的文件
CREATE POLICY "Authenticated users can delete own works" ON storage.objects
  FOR DELETE USING (bucket_id = 'works' AND auth.uid() = owner);
```

**选项 B：通过 Storage 界面**
1. 在 Storage 页面点击顶部的 **Policies** 标签
2. 点击 **New policy**
3. 选择 **For full customization**
4. 分别添加上述 3 个策略，设置对应的 Policy type 和 Policy definition

#### 3.4 创建管理员账号

在 Supabase Dashboard 中：
1. 进入 **Authentication** → **Users**
2. 点击 **Add user** 创建新用户
3. 使用邮箱和密码创建管理员账号

### 4. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填入 Supabase 配置：

```bash
cp .env.example .env.local
```

在 `.env.local` 中填入：

```
NEXT_PUBLIC_SUPABASE_URL=你的_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_anon_key
```

这些值可以在 Supabase Dashboard 的 **Project Settings** → **API** 中找到。

### 5. 运行项目

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

## 部署

### 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 访问 [vercel.com](https://vercel.com) 导入仓库
3. 在部署设置中添加环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. 点击 Deploy

### 在 Supabase 中配置网站域名

在 Supabase Dashboard 中：
1. 进入 **Authentication** → **URL Configuration**
2. 添加你的 Vercel 域名到 Redirect URLs

## 项目结构

```
cos/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 首页 - 作品画廊
│   │   ├── layout.tsx         # 根布局
│   │   ├── globals.css        # 全局样式
│   │   ├── booking/           # 预约页面
│   │   ├── gallery/[id]/      # 作品详情页
│   │   └── admin/             # 管理后台
│   ├── components/            # React 组件
│   ├── lib/                   # 工具库
│   │   ├── supabase.ts        # Supabase 客户端
│   │   └── database.types.ts  # 数据库类型
│   └── types/                 # TypeScript 类型
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 常见问题

### 图片上传失败

确保：
- Storage 桶已创建并设为公开
- RLS 策略已正确配置
- 文件大小未超过限制（默认 50MB）

### 无法登录

确保：
- 已在 Supabase Authentication 中创建用户
- 环境变量配置正确
- 浏览器允许第三方 Cookie

### 预约提交失败

检查：
- bookings 表已创建
- RLS 策略允许公开插入
- 表单字段验证通过

## 许可证

MIT

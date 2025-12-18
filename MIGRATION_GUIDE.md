# Prisma Migration Guide

## O'z Kompyuteringizda Migration Qilish

### 1. Database Mavjudligini Tekshirish

MySQL/MariaDB da database yarating (agar yo'q bo'lsa):

```sql
CREATE DATABASE core_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. .env Faylni To'g'rilash

`backend/.env` faylda `DATABASE_URL` ni to'g'ri to'ldiring:

```env
# O'z ma'lumotlaringizni kiriting:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=core_app

# To'liq URL (parol bo'lsa @ oldidan URL encode qiling):
DATABASE_URL=mysql://root:your_password@localhost:3306/core_app
```

**Muhim:** Agar parolingizda maxsus belgilar bo'lsa (`@`, `:`, `/` va h.k.), ularni URL encode qiling:
- `@` → `%40`
- `:` → `%3A`
- `/` → `%2F`
- `#` → `%23`

Masalan:
```
Password: Pass@123
DATABASE_URL: mysql://root:Pass%40123@localhost:3306/core_app
```

### 3. Migration Statusni Tekshirish

```bash
cd backend
npm run prisma:migrate:dev
```

Bu quyidagilarni qiladi:
1. Database bilan ulanishni tekshiradi
2. Mavjud migration'larni tekshiradi
3. Yangi migration yaratadi (kerak bo'lsa)
4. Migration'ni database'ga qo'llaydi
5. Prisma Client'ni generate qiladi

### 4. Migration Yaratish (Birinchi Marta)

Agar birinchi marta migration qilayotgan bo'lsangiz:

```bash
npm run prisma:migrate:dev --name init_database
```

### 5. Database Seed Qilish

Migration'dan keyin database'ni boshlang'ich ma'lumotlar bilan to'ldiring:

```bash
npm run prisma:seed
```

Bu quyidagilarni yaratadi:
- 4ta role: super, admin, user, guest
- Barcha policy'lar (68ta)
- Role-policy bog'lanishlar
- 3ta group: Development, HR, Marketing
- Super admin user: balkibumen@gmail.com / Admin@123

### 6. Database'ni Ko'rish

Prisma Studio'ni ochib database'ni ko'ring:

```bash
npm run prisma:studio
```

Browser'da: http://localhost:5555

## Migration Buyruqlari

### Development (o'zgarishlarni sinash uchun)
```bash
npm run prisma:migrate:dev
# yoki
npm run prisma:migrate:dev --name migration_nomi
```

### Production (server'ga)
```bash
npm run prisma:migrate
```

### Migration Status
```bash
npx prisma migrate status
```

### Database'ni Reset Qilish (EHTIYOT!)
```bash
# Barcha ma'lumotlarni o'chiradi va qaytadan migration qiladi
npx prisma migrate reset
```

### Migration Rollback
```bash
# Oxirgi migration'ni bekor qilish
npx prisma migrate resolve --rolled-back <migration_name>
```

## Muammolarni Hal Qilish

### 1. "Can't reach database server"

**Sabab:** DATABASE_URL noto'g'ri yoki MySQL ishlamayapti.

**Yechim:**
```bash
# MySQL ishlaganini tekshiring
mysql -u root -p

# .env faylda DATABASE_URL to'g'riligini tekshiring
```

### 2. "Database does not exist"

**Yechim:**
```sql
CREATE DATABASE core_app;
```

### 3. "Access denied for user"

**Yechim:** Parol va user nomini tekshiring, yoki yangi user yarating:
```sql
CREATE USER 'root'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON core_app.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Migration conflict

**Yechim:**
```bash
# Migration'ni reset qiling (development da)
npx prisma migrate reset

# yoki resolve qiling
npx prisma migrate resolve --applied <migration_name>
```

## Migration Qilish Jarayoni

1. **Prisma Client Generate** ✅ (Siz allaqachon qildingiz!)
   ```bash
   npm run prisma:generate
   ```

2. **Database Migration** 👉 (Hozir buni qiling!)
   ```bash
   npm run prisma:migrate:dev
   ```

3. **Database Seed**
   ```bash
   npm run prisma:seed
   ```

4. **Server Run**
   ```bash
   npm run dev
   ```

## Qo'shimcha Ma'lumot

- Migration fayllar: `backend/prisma/migrations/`
- Schema fayl: `backend/prisma/schema.prisma`
- Seed fayllar: `backend/prisma/seeds/`
- Config fayl: `backend/.config/prisma.config.ts`

Muammo bo'lsa, xabar bering! 🚀

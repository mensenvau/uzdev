# SQL Migration Guide

Prisma olib tashlandi. Barcha migratsiyalar va seedlar to‘g‘ridan-to‘g‘ri SQL bilan `database/` papkasida yuradi. Har bir modul o‘z prefiksi bilan alohida `init_<module>.sql` va `seed_<module>.sql` ga ega bo‘ladi.

## Bir martalik system init/seed

```
npm run db:init   # database/migrations/*.sql (alfabet tartibida, avval init_system.sql)
npm run db:seed   # database/seeds/*.sql (alfabet tartibida, avval seed_system.sql)
```

## Modul qo‘shish

```
npm run db:module:create   # interaktiv skript modul nomi va tavsifi so‘raydi
```

Bu `database/migrations/init_<module>.sql` va `database/seeds/seed_<module>.sql` fayllarini yaratadi. Prefiksni modul nomi sifatida ishlating (masalan `hr_`, `crm_`, `dss_`). Init faylida barcha `DROP TABLE IF EXISTS <prefix>_*` va kerakli `CREATE TABLE` larni yozing. Seed faylida boshlang‘ich ma’lumotlar bo‘ladi.

## Reset (faqat dev)

```
npm run db:reset   # barcha jadvallarni drop -> init -> seed
```

## Tartib va qoidalar

- Migrations: `database/migrations/` (system + modullar)
- Seeds: `database/seeds/` (system + modullar)
- Fayllar alfabet bo‘yicha bajariladi, shuning uchun `init_system.sql` va `seed_system.sql` birinchi bo‘lishi kerak.
- Jadvallar har doim prefiks bilan (`system_`, `hr_`, `crm_` ...) va `snake_case`.

<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const logout = () => {
    userStore.logout()
}

const menuItems = [
  { label: 'หน้าแรก', route: '/', icon: '🏠' },
  { label: 'สินค้าทั้งหมด', route: '/products', icon: '🛒' },
  { label: 'ประกอบคอม', route: '/build', icon: '🔧' },
  { label: 'โปรโมชั่น', route: '/promotions', icon: '🏷️' },
  { label: 'ติดต่อเรา', route: '/contact', icon: '📞' },
]
</script>

<template>
  <div data-theme="light" class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <div class="bg-base-100 shadow-md sticky top-0 z-50">
      <div class="container mx-auto">
        <!-- Top Navbar -->
        <div class="flex justify-between items-center h-20 px-4">
          <div class="flex items-center gap-2">
            <NuxtLink to="/" class="no-animation">
              <img src="https://media.discordapp.net/attachments/1293190535003242508/1347614085348462663/image.png?ex=67eb722b&is=67ea20ab&hm=3f18ad9046b818d02b47c40484828c696372120f70a5f23993ae34bb9da9024a&=&format=webp&quality=lossless" alt="logo" class="w-36 h-auto">
            </NuxtLink>
          </div>

          <!-- Search Bar -->
          <div class="flex-1 max-w-[750px] px-4">
            <div class="relative">
              <input type="text" placeholder="🔍 ค้นหาสินค้า..." 
                     class="input input-bordered rounded-full w-full pl-10 pr-4 focus:outline-primary" />
            </div>
          </div>

          <!-- User Menu -->
          <ClientOnly>
            <div class="flex items-center gap-4">

            <div v-if="userStore.isLoggedIn" class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost no-animation px-2 flex items-center gap-2">
                <div class="avatar online">
                  <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img alt="User avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div class="hidden md:block text-left">
                  <div class="font-medium">{{ userStore.user }}</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg mt-3">

                <li>
                  <NuxtLink to="/profile">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    โปรไฟล์
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/orders">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    ประวัติการสั่งซื้อ
                  </NuxtLink>
                </li>
                <!-- <li>
                  <NuxtLink to="/wishlist">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    สินค้าที่ชอบ
                  </NuxtLink>
                </li> -->
                <div class="divider my-1"></div>
                <li>
                  <a @click="logout" class="text-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    ออกจากระบบ
                  </a>
                </li>
              </ul>
            </div>
            <div class="flex gap-2" v-else>
              <NuxtLink to="/login" class="btn btn-primary">เข้าสู่ระบบ</NuxtLink>
              <NuxtLink to="/register" class="btn btn-outline btn-primary">สมัครสมาชิก</NuxtLink>
            </div>
            </div>
          </ClientOnly>
        </div>

        <!-- Navigation Menu -->
        <div class="border-t">
          <nav class="flex justify-center gap-6 px-4">
            <NuxtLink v-for="item in menuItems" 
                     :key="item.route" 
                     :to="item.route"
                     class="btn btn-ghost no-animation rounded-none hover:text-primary">
              <span class="mr-2">{{ item.icon }}</span>
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="footer p-10 bg-base-200 text-base-content">
      <aside class="max-w-md">
        <img src="https://media.discordapp.net/attachments/1293190535003242508/1347614085348462663/image.png?ex=67eb722b&is=67ea20ab&hm=3f18ad9046b818d02b47c40484828c696372120f70a5f23993ae34bb9da9024a&=&format=webp&quality=lossless" alt="logo" class="w-36 h-auto mb-4">
      </aside> 
      <nav>
        <h6 class="footer-title">บริการของเรา</h6> 
        <a class="link link-hover">ประกอบคอมพิวเตอร์</a>
        <a class="link link-hover">อัพเกรดคอมพิวเตอร์</a>
        <a class="link link-hover">ซ่อมคอมพิวเตอร์</a>
        <a class="link link-hover">ติดตั้งซอฟต์แวร์</a>
      </nav> 
      <nav>
        <h6 class="footer-title">ข้อมูลบริษัท</h6> 
        <a class="link link-hover">เกี่ยวกับเรา</a>
        <a class="link link-hover">ติดต่อเรา</a>
        <a class="link link-hover">ร่วมงานกับเรา</a>
        <a class="link link-hover">ข่าวสารและกิจกรรม</a>
      </nav> 
      <nav>
        <h6 class="footer-title">กฎหมาย</h6> 
        <a class="link link-hover">เงื่อนไขการใช้งาน</a>
        <a class="link link-hover">นโยบายความเป็นส่วนตัว</a>
        <a class="link link-hover">นโยบายคุกกี้</a>
      </nav>
    </footer>
  </div>
</template>

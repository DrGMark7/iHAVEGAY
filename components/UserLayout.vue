<script setup>

</script>

<template>
    <div class=" bg-base-100 h-20">
        <div class="container mx-auto flex justify-between items-center h-20">
            <div class="flex">
                <NuxtLink to="/" class="btn btn-ghost no-animation text-xl">
                    <img src="https://ihavecpu.com/assets/images/logo.svg" alt="logo" class="w-36 h-auto">
                </NuxtLink>
            </div>
            <div class="flex-1 max-w-[750px]">
                <input type="text" placeholder="ค้นหาสินค้า" class="input input-bordered rounded-full w-full" />
            </div>
            <div class="flex gap-2">
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a class="justify-between">
                                Profile
                                <span class="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>

        </div>

    </div>

</template>

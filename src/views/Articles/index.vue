<script setup lang="ts">
import { ref } from 'vue'
import Banner from "@/components/public/Banner/index.vue"
</script>
<template>
    <div class="Articles">
        <Banner></Banner>
        <div class="site-content">
        </div>
        <div class="site-content">
      
        </div>
    </div>
</template>
<style scoped lang="less">
.site-content {
    .notify {
        margin: 60px 0;
        border-radius: 3px;
        & > div {
            padding: 20px;
        }
    }
    .search-result {
        padding: 15px 20px;
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        border: 1px dashed #ddd;
        color: #828282;
    }
}
.top-feature {
    width: 100%;
    height: auto;
    margin-top: 30px;

    .feature-content {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        position: relative;

        .feature-item {
            width: 32.9%;
        }
    }
}

.site-main {
    padding-top: 80px;

    &.search {
        padding-top: 0;
    }
}

.more{
    margin: 50px 0;
    .more-btn{
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ADADAD;
        border: 1px solid #ADADAD;
        border-radius: 20px;
        margin: 0 auto;
        cursor: pointer;
        &:hover{
            color: #8fd0cc;
            border: 1px dashed #8fd0cc;
        }
    }
}

/******/
@media (max-width: 800px) {
    .top-feature {
        display: none;
    }

    .site-main {
        padding-top: 40px;
    }

    .site-content {
        .notify {
            margin: 30px 0 0 0;
        }

        .search-result {
            margin-bottom: 20px;
            font-size: 16px;
        }
    }
}
/******/
</style>

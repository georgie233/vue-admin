<template>
    <div style="display: flex;align-items: center;">
        <img style="max-width: 200px;padding: 7px;" v-if="defUrl && !imageUrl" :src="defUrl" alt="无法显示">
        <a-upload
            :name="name"
            list-type="picture-card"
            class="avatar-uploader"
            :headers="{'key':keyStr}"
            :show-upload-list="false"
            :action="upload_path"
            :before-upload="avatarUpload"
            @change="avatarChange"
        >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar"/>
            <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'"/>
                <div class="ant-upload-text">
                    上传
                </div>
            </div>
        </a-upload>
    </div>
</template>

<script>
import {UPLOAD_FILE} from "@/services/api";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default {
    model: {
        prop: 'value',
        event: 'put.value'
    },
    props: ['keyStr', 'name', 'default_url','base_url'],
    name: "uploadAvatar",
    computed:{
        defUrl: function(){
            if(this.default_url)
                return this.base_url.replace('/api','/upload/') + this.default_url;
            else return '';
        }
    },
    data() {
        return {
            upload_path: UPLOAD_FILE,
            imageUrl: '',
            onlineUrl: '',
            loading: false,
        }
    },
    watch: {
    },
    methods: {
        avatarChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, imageUrl => {
                    if (info.file.response.code === 200){
                        this.onlineUrl = info.file.response.data.url;
                        this.$emit('put.value',this.onlineUrl);
                        this.imageUrl = imageUrl;
                    }else {
                        this.$message.error(info.file.response.message);
                    }
                    this.loading = false;
                });
            }
        },
        avatarUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                this.$message.error('只支持jpg或png格式!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('图片不能大于 2MB!');
            }
            return isJpgOrPng && isLt2M;
        },
    }
}
</script>

<style>
.avatar-uploader img {
    max-width: 200px;
}
</style>

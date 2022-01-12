<template>
    <div class="TimeRangeSelection">
        <a-date-picker
            v-model="startValue"
            :disabled-date="disabledStartDate"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Start"
            @openChange="handleStartOpenChange"
        />
        <a-date-picker
            v-model="endValue"
            :disabled-date="disabledEndDate"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="End"
            :open="endOpen"
            @openChange="handleEndOpenChange"
        />
    </div>
</template>

<script>
export default {
    name: "TimeRangeSelection",
    model: {
        prop: 'value',
        event: 'put.value'
    },
    data() {
        return {
            startValue: null,
            endValue: null,
            endOpen: false,
        };
    },
    watch: {
        startValue() {
            console.log(this.startValue);
            let time = this.getFullTime(this.startValue !== null ? this.startValue['_d'] : false);
            let time2 = this.getFullTime(this.endValue !== null ? this.endValue['_d'] : false);
            if (time && time2) {
                this.$emit('put.value', `${time},${time2}`);
            }else this.$emit('put.value', '');
        },
        endValue() {
            let time = this.getFullTime(this.startValue !== null ? this.startValue['_d'] : false);
            let time2 = this.getFullTime(this.endValue !== null ? this.endValue['_d'] : false);
            if (time && time2) {
                this.$emit('put.value', `${time},${time2}`);
            }else this.$emit('put.value', '');
        },
    },
    methods: {
        getFullTime(date_) {
            if (!date_) return;
            let date = new Date(date_),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                Y = date.getFullYear() + '',
                M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
                D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()),
                h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()),
                m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()),
                s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
            return `${Y}-${M}-${D} ${h}:${m}:${s}`;
        },
        disabledStartDate(startValue) {
            const endValue = this.endValue;
            if (!startValue || !endValue) {
                return false;
            }
            return startValue.valueOf() > endValue.valueOf();
        },
        disabledEndDate(endValue) {
            const startValue = this.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            return startValue.valueOf() >= endValue.valueOf();
        },
        handleStartOpenChange(open) {
            if (!open) {
                this.endOpen = true;
            }
        },
        handleEndOpenChange(open) {
            this.endOpen = open;
        },
    },
};
</script>

<style scoped lang="less">
.TimeRangeSelection{
    .ant-calendar-picker{
        min-width: 50px !important;
        width: 50% !important;
    }
}
</style>

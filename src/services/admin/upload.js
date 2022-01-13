import {request, METHOD} from '@/utils/request'
import {UPLOAD_FILE} from '@/services/api';

export async function uploadFile(data) {
    return request(UPLOAD_FILE, METHOD.POST, data);
}

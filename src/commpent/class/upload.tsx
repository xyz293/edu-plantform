import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { uploadClass } from '../../api/class';

const Upload = ({ id }: { id: number }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) {
      message.error('请先选择文件');
      return;
    }
    const formData = new FormData();
    const uploadFile = new File([file], file.name, { type: file.type });
    formData.append('file', uploadFile);
    formData.append('id', id.toString());

    try {
      const res = await uploadClass(formData);
      console.log(res);
      message.success('上传成功');
    } catch (err) {
      console.error(err);
      message.error('上传失败');
    }
  };

  return (
    <div>
      <Form>
        <Form.Item label="上传班级文件">
          <Input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleUpload}>
            上传
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Upload;

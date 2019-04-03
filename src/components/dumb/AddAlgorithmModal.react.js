import React, { useState } from 'react';
import algorithmObjectTemplate from './../stubs/algorithm-object.json';
import schema from './../../config/algorithm-input-schema.json';
import { Modal, Input, Icon, Select, InputNumber, Upload, Divider, Form, Row, Col, Button } from 'antd';
import parseUnit from 'parse-unit';
import './AlgorithmInput.scss';

const Option = Select.Option;

const _parseUnit = obj => {
  const [val, unit] = parseUnit(obj);
  return { val, unit };
};

const insertAlgorithmOptions = options =>
  Object.entries(options).map(([key]) => (
    <Option key={key.toString()} value={key}>
      {key.toUpperCaseFirstLetter()}
    </Option>
  ));

const availableOptions = options =>
  Object.entries(options)
    .filter(([, value]) => value)
    .map(([key]) => key);

const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
  labelAlign: 'left'
};

export default function AddAlgorithmModal(props) {
  const [algoData, setAlgoData] = useState(algorithmObjectTemplate);
  const [file, setFile] = useState(undefined);
  const memory = _parseUnit(algoData.mem);

  const dragProps = {
    name: 'file',
    multiple: false,
    accept: '.zip,.tar.gz',
    customRequest: ({ file, onSuccess }) => {
      setTimeout(() => {
        setFile(file);
        onSuccess('OK');
      }, 0);
    },
    onChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    }
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('payload', JSON.stringify(algoData));
    // TODO: remove console
    console.info(algoData);
    props.onSubmit(formData);
    props.toggleVisible();
  };

  return (
    <Modal
      title={'Add New Algorithm'}
      visible={props.visible}
      onOk={onSubmit}
      onCancel={props.toggleVisible}
      footer={[
        <Button key={1} type="primary" size="default" onClick={onSubmit}>
          Submit
        </Button>,
        <Button key={2} disabled={true}>
          Preview
        </Button>,
        <Button key={3} onClick={props.toggleVisible}>
          Cancel
        </Button>
      ]}
    >
      <Form>
        <Form.Item {...formItemLayout} label={schema.name}>
          <Input
            className="input"
            value={algoData.name}
            onChange={e => setAlgoData({ ...algoData, name: e.target.value })}
            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Insert algorithm name"
          />
        </Form.Item>
        <Form.Item {...formItemLayout} label={schema.image}>
          <Input
            className="input"
            value={algoData.algorithmImage}
            onChange={e => setAlgoData({ ...algoData, algorithmImage: e.target.value })}
            prefix={<Icon type="share-alt" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Insert algorithm image"
          />
        </Form.Item>
        <Divider className="divider" orientation="left">
          {schema.resources}
        </Divider>
        <Form.Item {...formItemLayout} label={schema.cpu}>
          <InputNumber min={1} value={algoData.cpu} defaultValue={algoData.cpu} onChange={v => setAlgoData({ ...algoData, cpu: +v })} />
        </Form.Item>
        <Form.Item {...formItemLayout} label={schema.gpu}>
          <InputNumber min={0} value={algoData.gpu} defaultValue={algoData.gpu} onChange={v => setAlgoData({ ...algoData, gpu: +v })} />
        </Form.Item>
        <Form.Item {...formItemLayout} label={schema.memory} labelAlign="left">
          <Row type="flex" justify="start" gutter={4}>
            <Col>
              <InputNumber min={1} value={memory.val} defaultValue={memory.val} onChange={v => setAlgoData({ ...algoData, mem: v + _parseUnit(algoData.mem).unit })} />
            </Col>
            <Col>
              <Select value={memory.unit} defaultValue={memory.unit} style={{ width: '90px' }} onChange={v => (algoData.mem = _parseUnit(algoData.mem).val + v)}>
                <Option value="Ki">Ki</Option>
                <Option value="M">M</Option>
                <Option value="Mi">Mi</Option>
                <Option value="Gi">Gi</Option>
                <Option value="m">m</Option>
                <Option value="K">K</Option>
                <Option value="G">G</Option>
                <Option value="T">T</Option>
                <Option value="Ti">Ti</Option>
                <Option value="P">P</Option>
                <Option value="Pi">Pi</Option>
                <Option value="E">E</Option>
                <Option value="Ei">Ei</Option>
              </Select>
            </Col>
          </Row>
        </Form.Item>
        <Divider className="divider" orientation="left">
          {schema.advanced}
        </Divider>
        <Form.Item {...formItemLayout} label={schema.minHotWorkers}>
          <InputNumber min={0} value={algoData.minHotWorkers} defaultValue={algoData.minHotWorkers} onChange={v => setAlgoData({ ...setAlgoData, minHotWorkers: v })} />
        </Form.Item>
        <Form.Item {...formItemLayout} label={schema.options}>
          <Select className="input" defaultValue={availableOptions(algoData.options)} mode="tags" placeholder="Enable Options" onSelect={v => (algoData.options[v] = !algoData.options[v])}>
            {insertAlgorithmOptions(algoData.options)}
          </Select>
        </Form.Item>
        <Divider className="divider" orientation="left">
          {schema.code}
        </Divider>
        <Form.Item {...formItemLayout} label={schema.environment}>
          <Select className="input" defaultValue={algoData.env} value={algoData.env} onChange={v => (algoData.env = v)}>
            <Option value="python">python</Option>
            <Option value="nodejs">nodejs</Option>
            <Option value="jvm">jvm</Option>
          </Select>
        </Form.Item>
        <Form.Item {...formItemLayout} label={schema.entryPoint}>
          <Input
            className="input"
            defaultValue={algoData.entryPoint}
            value={algoData.entryPoint}
            onChange={e => setAlgoData({ ...algoData, entryPoint: e.target.value })}
            prefix={<Icon type="login" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Insert Entry Point"
          />
        </Form.Item>
        <Form.Item style={{ marginTop: '15px' }}>
          <Upload.Dragger {...dragProps}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag algorithm source code to this area to upload</p>
            <p className="ant-upload-hint">Support for zip or tar.gz only</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
}

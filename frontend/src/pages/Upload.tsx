import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Card, Form, FormControl, Table, ListGroup, ListGroupItem, Dropdown } from "react-bootstrap";
import * as XLSX from "xlsx";
import Ajv from "ajv";
import { createSummary, getMonthSummaryCount, deleteSummaryByPlantIdDate } from '../http/summaryAPI';
import { ISummaryUploadData, IXLSData, ISummaryCountData } from '../types/upload';
import { uploadArraySchema } from "../schemas/xls-upload.schema";
import UploadTable from '../components/tables/UploadTable';
import { getAllPlants } from '../http/plantAPI';
import SummaryCountsTable from '../components/tables/SummaryCountsTable';

interface IPlantsOption {
    id: number;
    name: string;
}

const Upload: React.FC = (): JSX.Element => {

    const avj = new Ajv();
    const val = avj.compile(uploadArraySchema);

    const [dataForUpload, setDataForUpload] = useState<ISummaryUploadData[]>([]);
    const [validated, setValidated] = useState<boolean | undefined>(undefined);
    const [uploaded, setUploaded] = useState<boolean>(false);
    const [file, setFile] = useState('');
    const [uploadDate, setUploadDate] = useState('2022-05-19');
    const [uploadPlantId, setUploadedPlantId] = useState('');
    const [plantsOption, setPlantsOption] = useState<IPlantsOption[]>([]);
    const [summaryCounts, setSummaryCounts] = useState<ISummaryCountData[]>([]);


    const getPlantsOption = async () => {
        await getAllPlants().then(res =>
            setPlantsOption(res)
        )
    };

    const getSummaryReport = async () => {
        await getMonthSummaryCount().then(res =>
            setSummaryCounts(res)
        )
    }

    const addStatesToJson = (json: IXLSData[]) => {
        const data: ISummaryUploadData[] = []
        for (let i = 0; i < json.length; i++) {
            data.push({
                ...json[i],
                date: uploadDate,
                uploaded: undefined
            })
        }
        return data
    }

    const updateDate = () => {
        const newArr = dataForUpload?.map(item => ({ ...item, date: uploadDate }));
        setDataForUpload(newArr);
    }

    const uploadDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUploadDate(e.target.value);
        updateDate();
    }

    const plantName = (ids: string): string => {
        const res = plantsOption.find(item => item.id === Number(ids));
        if (res) return res.name;
        return "Не выбрана";
    }

    const setUploadStatus = (index: number, status: boolean) => {
        const temp_state = [...dataForUpload];
        const temp_elem = temp_state[index];
        temp_elem.uploaded = status;
        setDataForUpload(temp_state);
    }

    const setFilePath = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValidated(false);
        let file = event.target.files?.[0]
        let reader = new FileReader();
        reader.onload = function (event) {
            let data = event.target?.result;
            try {
                setDataForUpload([]);
                let wb = XLSX.read(data);
                const ws = wb.Sheets[wb.SheetNames[0]];
                const json: IXLSData[] = XLSX.utils.sheet_to_json(ws, { raw: false });

                if (val(json)) {
                    console.log('validate');
                    setDataForUpload(addStatesToJson(json));
                    setValidated(true);
                } else {
                    console.log(val.errors);
                }
            } catch (error) {
                throw Error("File error")
            }

        };
        file && reader.readAsArrayBuffer(file);
    }

    const clearData = () => {
        setValidated(undefined);
        setUploaded(false);
        setDataForUpload([]);
        setFile('')
    }

    const uploadToDb = async () => {
        if (dataForUpload && validated && uploadDate) {
            await dataForUpload.forEach((item, index) => {
                createSummary(item).then(res => {
                    setUploadStatus(index, true)
                }).catch(err => {
                    setUploadStatus(index, false)
                })
                setUploaded(true);
                getSummaryReport();
            })
        }
    }

    const deleteSummary = async (plantId: string, date: string) => {
        await deleteSummaryByPlantIdDate(plantId, date).then(
            () => getSummaryReport()
        )
    }


    useEffect(() => {
        updateDate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadDate]);

    useEffect(() => {
        getPlantsOption();
        getSummaryReport();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="vh-100 d-flex flex-column overflow-hidden px-3">
            <div className="d-flex align-item-center justify-content-center pt-4 ">
                <div>
                    <h1>Загрузка сводок</h1>
                </div>
            </div>
            <Card >
                <Card.Body className="m-0 p-0">
                    <Form className="d-flex row m-0 p-0">
                        <Form.Group className="col-4 d-flex flex-column flex-grow-1 pt-3 justify-content-between">
                            <Form.Group>
                                <h3>Данные для загрузки:</h3>
                            </Form.Group>

                            <Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Файл сводки для загрузки</Form.Label>
                                    <FormControl
                                        className="shadow-none"
                                        type="file"
                                        id="file"
                                        value={file}
                                        disabled={uploaded}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setFile(e.target.value)
                                            setFilePath(e)
                                            // e.target.value = ""
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Загружать на дату:</Form.Label>
                                    <FormControl className="shadow-none"
                                        type="date"
                                        value={uploadDate}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            uploadDateChange(e)
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Выберите площадку:</Form.Label>
                                    <Form.Select className="shadow-none"
                                        value={uploadPlantId}
                                        onChange={(e) => {
                                            setUploadedPlantId(e.target.value)
                                        }}
                                    >
                                        <option key="-" value="">Выберите площадку</option>
                                        {plantsOption &&
                                            plantsOption.map(item =>
                                                <option
                                                    key={item.id}
                                                    value={item.id}>
                                                    {item.name}
                                                </option>)
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className="d-flex col-2 flex-grow-1 flex-column pt-3 justify-content-between">
                            <Form.Group>
                                <Form.Group>
                                    <h3>Выбрано:</h3>
                                </Form.Group>
                                <Form.Label>Дата: {uploadDate} </Form.Label>
                                <Form.Label>Площадка: {plantName(uploadPlantId)} </Form.Label>
                            </Form.Group >
                            <Form.Group >
                                <Button
                                    variant="btn btn-success shadow-none mb-2 w-100"
                                    disabled={uploaded || !dataForUpload || dataForUpload?.length === 0 || !uploadDate || !uploadPlantId}
                                    onClick={() => uploadToDb()}
                                >
                                    Загрузить в базу данных
                                </Button>

                                <Button
                                    variant="btn btn-success shadow-none mb-2 w-100"
                                    disabled={!uploaded}
                                    onClick={() => clearData()}

                                >
                                    Очистить данные
                                </Button>
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className="col-6 container-fluid ">
                            <Form.Group className=" row h-25 w-50 display-inline-block position-absolute text-left pl-3 pt-3">
                                <h3>Сводки в базе:</h3>
                            </Form.Group>
                            <Form.Group className="row h-75  w-50 display-inline-block bottom-0 position-absolute ">
                                {/* <Form.Group className="row overflow-auto  h-100  m-0 p-0 w-100 display-inline-block position-absolute "> */}
                                <Form.Group className="h-100 d-flex flex-row overflow-hidden pb-3">
                                    {/* <Dropdown.Menu className="" show>
                                        {summaryCounts.map((item, ind) =>
                                            <Dropdown.Item eventKey={ind}
                                                
                                            >
                                                {item.date} - {item.plant.name} - {item.count}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu> */}
                                    <SummaryCountsTable
                                        items={summaryCounts}
                                        deleteSummary={(id, date) => deleteSummary(id, date)}
                                    />
                                </Form.Group>
                            </Form.Group>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>



            {
                validated !== undefined && !validated &&
                <div className="alert alert-danger mt-4 pt-3">
                    Формат файла не совпадает!
                </div>
            }
            {
                (uploadDate === undefined || uploadDate === "") &&
                <div className="alert alert-danger mt-4 pt-3">
                    Не выбрана дата!
                </div>
            }
            {
                (uploadPlantId === undefined || uploadPlantId === "") &&
                <div className="alert alert-danger mt-4 pt-3">
                    Не выбрана площадка!
                </div>
            }

            <div className="flex-fill d-flex flex-row overflow-hidden pt-4 pb-4">

                {dataForUpload && dataForUpload.length > 0 && validated &&
                    <UploadTable items={dataForUpload} />
                }
            </div>


        </div >
    )
}

export default Upload;
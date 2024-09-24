import { Input, InputDescription, MultiSelect, TextInput } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import axios from 'axios';
import { useEffect, useState } from 'react';

function MultiSelectApi({ id, label, placeholder, description, data, apiurl, limit, sendDataToParent }: any) {
    const [selection, setSelection] = useState<any>([]);
    function valueSelected(e: any) {
        sendDataToParent(e);
    }

    // const getSelection = async (datas: any) => {
    //     const extra_param = data;
    //     // console.log(datas);
    //     const params = {
    //         ...extra_param,
    //         search: datas,
    //     }

    // }

    useEffect(() => {
        const extra_param = data;

        // Get the input box
        const input: any = document.getElementById('search_customer');
        // Init a timeout variable to be used below
        var timeout: any = null;

        // Listen for keystroke events
        input.addEventListener('keyup', function (e: any) {
            const params = {
                ...extra_param,
                search: input.value,
            }
            // Clear the timeout if it has already been set.
            // This will prevent the previous task from executing
            // if it has been less than <MILLISECONDS>
            // console.log(input.value);
            clearTimeout(timeout);
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            // Make a new timeout set to go off in 1000ms (1 second)
            if (e.keyCode !== 8) {
                timeout = setTimeout(function () {
                    // console.log(input.value);
                    getSelectionApi(params);
                }, 1000);
            }
        });
    }, [])

    const getSelectionApi = async (params: any) => {
        await axios.get(apiurl, {
            params: params
        }).then((result) => {
            let data_result = result.data.customer_selection;
            if (data_result) {
                let selection_data: any = [];
                if (data.group) {
                    selection_data = [];
                    Object.keys(data_result).forEach(key => {
                        const value = data_result[key];
                        let item: any = [];
                        value.map((elem: any, id: any) => {
                            item.push({ label: "" + elem.label + "", value: "" + elem.value + "" })
                        })
    
                        selection_data.push({ group: key, items: item });
                    });
                }else{
                    Object.keys(data_result).forEach(key => {
                        const value = data_result[key];
                        value.map((elem: any, id: any) => {
                            // return { label: "" + elem.label + "", value: "" + elem.value + "" };
                            selection_data.push({ label: "" + elem.label + "", value: "" + elem.value + "" });
                        })
                    });
                }
                
                setSelection(selection_data);
            }
        }).catch((error) => {
            console.log('Show error notification!', error)
            return Promise.reject(error)
        })
    }

    return (
        <>
            <MultiSelect
                id={id}
                label={label}
                placeholder={placeholder}
                description={description}
                searchable
                limit={limit}
                data={selection}
                onChange={valueSelected}
                clearable
            // onSearchChange={(e) => getSelection(e)}
            />
        </>
    );
}

export default MultiSelectApi;

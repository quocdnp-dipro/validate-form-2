import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "reactstrap";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "./input/InputField";

type Profile = {
    items: {
        startDate: Date,
        endDate: Date,
        schoolName: string,
        schoolAddress: string
    }[];

};

function App() {
    const schema = yup.object().shape({
        startDate: yup.date().required(),
        endDate: yup.date().required().min(
            yup.ref('startDate')),
        schoolName: yup.string().required(),
        schoolAddress: yup.string().when('schoolName', {
            is: (schoolName: string) => { return schoolName === undefined },
            then: schema => schema.notRequired(),
            otherwise: schema => schema.required()
        })
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Profile>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items'
    });

    // window.addEventListener("beforeunload", (e) => unload() ? e.returnValue = 'unload page' : 0);

    const onSubmit = (data: Profile) => {
        console.log(data)
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className="flex border-[0.4px] flex-col py-9 px-8 shadow-lg shadow-indigo-500 sm:w-2/3 w-screen text-center relative"
            >
                <fieldset disabled={isSubmitting} >
                    <div className='absolute top-8 right-8 flex gap-6'>
                        <button
                            onClick={() => append({ startDate: new Date(), endDate: new Date(), schoolName: "", schoolAddress: "" })}
                            type='button'
                            className='w-8 h-8 border-2 rounded-full border-red-400 text-lg flex justify-center items-center'>+</button>
                    </div>
                    <div className="flex gap-8">
                        <InputField
                            placeholder="start day"
                            control={control}
                            name="startDate"
                            type="date"
                            errors={errors}
                            id='name'
                        />
                        <InputField
                            placeholder="end date"
                            control={control}
                            name="endDate"
                            type="date"
                            errors={errors}
                        />
                        <InputField
                            placeholder="school"
                            control={control}
                            type="text"
                            name="schoolName"
                            errors={errors}
                        />
                        <InputField
                            placeholder="school name"
                            control={control}
                            type="text"
                            name="schoolAddress"
                            errors={errors}
                        />
                    </div>
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id} className="flex gap-8">
                                <div className="flex gap-8 items-center">
                                    <InputField
                                        placeholder="start day"
                                        control={control}
                                        name="startDate"
                                        type="date"
                                        errors={errors}
                                        id='name'
                                    />
                                    <InputField
                                        placeholder="end date"
                                        control={control}
                                        name="endDate"
                                        type="date"
                                        errors={errors}
                                    />
                                    <InputField
                                        placeholder="school"
                                        control={control}
                                        type="text"
                                        name="schoolName"
                                        errors={errors}
                                    />
                                    <InputField
                                        placeholder="school name"
                                        control={control}
                                        type="text"
                                        name="schoolAddress"
                                        errors={errors}
                                    />
                                </div>
                                <button
                                    type='button'
                                    onClick={() => remove(index)}
                                    className='w-8 h-8 border-2 rounded-full border-red-400 text-xl flex justify-center'>-</button>
                            </div>
                        );
                    })}

                    <Button color="info" className="mt-8 text-gray-500 absolute bottom-4 right-4 w-[7rem] tracking-wide">
                        Submit
                    </Button>
                </fieldset>
            </Form>
        </div>
    );
}

export default App;

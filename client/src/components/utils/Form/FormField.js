import React from 'react';

const FormField = ({formData, changed, id}) => {
    const showError = () => {
        let errorMessage = null;

        if(formData.validation && !formData.valid){
            errorMessage = (
                <div className="error_label">
                   {formData.validationMessage}
                </div>
            )
        }


        return errorMessage
    }
        

   
    const renderTemplate = () => {
        let formTemplate = null;

        switch(formData.elementType){
            case('input'):
                formTemplate = (
                    <div className="formBlock">
                    {formData.showlabel ? 
                        <div className="label_inputs">{formData.elementConfig.label}</div>
                :null
                }
                        <input
                            {...formData.elementConfig}
                            value={formData.value}
                            onBlur={(event)=> changed({event,id,blur:true})}
                            onChange={(event)=> changed({event,id}) }
                        />
                        {showError()}
                    </div>
                )
                break;
            case("textarea"):
                formTemplate = (
                    <div className="formBlock">
                    {formData.showlabel ? 
                        <div className="label_inputs">{formData.elementConfig.label}</div>
                :null
                }
                        <textarea
                            {...formData.elementConfig}
                            value={formData.value}
                            onBlur={(event)=> changed({event,id,blur:true})}
                            onChange={(event)=> changed({event,id}) }
                        />
                        {showError()}
                    </div>
                )
                break;
            case("select"):
                formTemplate = (
                    <div className="formBlock">
                    {formData.showlabel ? 
                        <div className="label_inputs">{formData.elementConfig.label}</div>
                :null
                }
                        <select
                             value={formData.value}
                             onBlur={(event)=> changed({event,id,blur:true})}
                             onChange={(event)=> changed({event,id})}
                        >
                            <option value="">Select One</option>
                           {formData.elementConfig.options.map((option,index) => {
                               return (
                                   <option  key={option.value} value={option.value}>{option.name}</option>
                               )
                           })
                        }
                        </select>
                        {showError()}
                    </div>
                )
                break;
            default:
                formTemplate = null;
        }

        return formTemplate;
    }
    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormField;
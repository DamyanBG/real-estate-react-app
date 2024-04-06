import { HOME_FIELDS } from '../../common/fields';
import FormSubmitButton from '../../common/FormSubmitButton';
import InputFormRow from '../../common/InputFormRow';

const HomeForm = ({ homeInfo, handleOnChange, handleOnSubmit, validationErrors, loading, isFetching }) => {
    return (
        <section className="home-form-container">
            <section className="home-form-section">
                <form onSubmit={handleOnSubmit} data-testid="home-create-form">
                    <h2>Add Your Home Details</h2>
                    <article className="content">
                        {HOME_FIELDS.map((hk) => (
                            <InputFormRow
                                key={hk.labelName}
                                labelName={hk.labelName}
                                name={hk.name}
                                value={homeInfo[hk.name]}
                                type={hk.type}
                                handleOnChange={handleOnChange}
                                validationError={validationErrors[hk.name]}
                                dataTestId={hk.name}
                            />
                        ))}
                        <article className="form-row">
                            <label>Description</label>
                            <textarea
                                type="text"
                                name="description"
                                data-testid="description"
                                value={homeInfo.description || ''}
                                onChange={handleOnChange}
                            />
                        </article>
                    </article>
                    <FormSubmitButton disabled={loading} text="Create Home" />
                </form>
            </section>
        </section>
    );
};

export default HomeForm;

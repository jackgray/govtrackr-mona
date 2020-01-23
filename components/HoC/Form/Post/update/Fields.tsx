import { ImageSrcInputField } from '@fields/Image/ImageSrc'
import { createFlagWithTextByLng } from '@fields/LocaleSwitcher/createFlagByLng'
import FormLocaleSwitcher from '@fields/LocaleSwitcher/LocaleSwitcher'
import { SwitchInputField } from '@fields/Switch/Switch'
import TagsField from '@fields/Tag/TagField'
import { TextInputField } from '@fields/Text/TextField'
import { i18n, withNamespaces } from '@i18n'
import { Lng } from '@i18n/types'
import { Button, Paper, Typography } from '@material-ui/core'
import { Field, FieldArray, Form, FormikProps } from 'formik'
import { PostCreateInput } from 'Post'
import { Dispatch, Fragment, FunctionComponent, useState } from 'react'
import { TranslateFn } from 'StatelessPage'

import { ContentField } from './ContentField'
import useStyles from './Styles'

const PostCreateFields: FunctionComponent<{
  fProps: FormikProps<PostCreateInput>
  t: TranslateFn
}> = ({ fProps, t }) => {
  const [currentLng, setLng]: [Lng, Dispatch<Lng>] = useState(i18n.language)

  const changeLng = (lng: Lng) => {
    if (currentLng !== lng) {
      setLng(lng)
    }

    return
  }

  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Form autoComplete="off">
        <FormLocaleSwitcher callbackFn={changeLng} />
        <Field
          label={t('fields:slug')}
          name="slug"
          id="slug"
          fullWidth={true}
          required={true}
          component={TextInputField}
        />

        <Field
          label={t('fields:published')}
          id="isPublished"
          name="isPublished"
          component={SwitchInputField}
        />
        <Field
          name="imageSrc"
          render={(renderCtx: { field: any; form: any }) => (
            <ImageSrcInputField
              {...renderCtx}
              fieldValueName="imageSrc"
              multiple={false}
              maxfiles={null}
            />
          )}
        />
        <FieldArray
          name="contents"
          render={() =>
            fProps.values.contents.map((content, i) => (
              <Fragment key={`post-update-content-${i}`}>
                {content.language!.country === currentLng ? (
                  <ContentField
                    key={`post-update-content-field-${i}`}
                    className={classes.content}>
                    <Typography
                      key={`post-update-content-${
                        fProps.values.contents[i].language.country
                      }-${i}`}
                      variant="body1">
                      {createFlagWithTextByLng(
                        fProps.values.contents[i].language!.country ===
                          currentLng
                          ? fProps.values.contents[i].language.country
                          : i18n.language
                      ) || ''}
                    </Typography>

                    <Field
                      component={TextInputField}
                      label="Title"
                      id={`contents.[${i}].title`}
                      name={`contents.[${i}].title`}
                      key={`contents.[${i}].title`}
                      required={true}
                      fullWidth={true}
                    />
                    <Field
                      component={TextInputField}
                      label="Image text"
                      id={`contents.[${i}].imageAlt`}
                      name={`contents.[${i}].imageAlt`}
                      key={`contents.[${i}].imageAlt`}
                      required={true}
                      fullWidth={true}
                    />
                    <Field
                      component={TextInputField}
                      label="Text"
                      id={`contents.[${i}].description`}
                      name={`contents.[${i}].description`}
                      key={`contents.[${i}].description`}
                      required={true}
                      fullWidth={true}
                      multiline={true}
                      rows={5}
                    />

                    <Field
                      component={TagsField}
                      contentIdx={i}
                      label="Tags"
                      id={`contents.[${i}].tags`}
                      name={`contents.[${i}].tags`}
                      key={`contents.[${i}].tags`}
                      fieldValueName={`contents.[${i}].tags`}
                      fullWidth={true}
                    />

                    <Field
                      component={TextInputField}
                      label="Meta title"
                      id={`contents.[${i}].metaTitle`}
                      name={`contents.[${i}].metaTitle`}
                      key={`contents.[${i}].metaTitle`}
                      required={true}
                      fullWidth={true}
                    />
                    <Field
                      component={TextInputField}
                      label="Meta description"
                      id={`contents.[${i}].metaDescription`}
                      name={`contents.[${i}].metaDescription`}
                      key={`contents.[${i}].metaDescription`}
                      required={true}
                      fullWidth={true}
                    />
                  </ContentField>
                ) : null}
              </Fragment>
            ))
          }
        />
        <br />
        <br />
        <br />
        <br />
        <Button fullWidth type="submit" variant="contained" size="large">
          {t('common:submit')}
        </Button>
      </Form>
    </Paper>
  )
}

export default withNamespaces(['common', 'fields'])(PostCreateFields)

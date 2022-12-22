import AsyncComponent from 'components/AsyncComponent';
import Button from 'components/Button';
import Box from 'components/FieldBox';
import SectionPageHeader from 'components/SectionPageHeader';
import SelectAntd, { Option } from 'components/SelectAntd';
import TextInput from 'components/TextInput';
import { Dashboard } from 'containers/Dashboard';
import elasticlunr from 'elasticlunr';
import withDebounce from 'hocs/withDebounce';
import { isEmpty } from 'ramda';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAuthors, useUpdateAuthorRole } from 'store/global/authors/action';
import { authorsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { Author } from 'types/Author';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { Divider, Space, View } from 'wiloke-react-core';

const roles: Option[] = [
  {
    value: 'SUPPER_ADMIN',
    label: 'SUPPER_ADMIN',
  },
  {
    value: 'ADMIN_GLOBAL',
    label: 'ADMIN_GLOBAL',
  },
  {
    value: 'SUPPORT_GLOBAL',
    label: 'SUPPORT_GLOBAL',
  },
  {
    value: 'DEV_PRIVATE',
    label: 'DEV_PRIVATE',
  },
  {
    value: 'USER_PRIVATE',
    label: 'USER_PRIVATE',
  },
];

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange', 200);

const elasticlunrIndex = elasticlunr<Author>(function() {
  this.addField('name');
  this.addField('shopName');
  this.setRef('id');
});

export const UserManagement = () => {
  const { data: users, getStatus, updateRoleStatus } = useSelector(authorsSelector);

  const getAuthors = useGetAuthors();
  const updateAuthor = useUpdateAuthorRole();
  const { role: userRole } = getUserInfo();

  const [role, setRole] = useState('');
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState('');
  const [userState, setUserState] = useState<Author[]>(users);

  useEffect(() => {
    getAuthors.request({ role: 'admin' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    users.forEach(item => {
      elasticlunrIndex.addDoc(item);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (focused) {
      const result = elasticlunrIndex.search(search, { expand: true }).map(({ ref }) => {
        return elasticlunrIndex.documentStore.getDoc(ref);
      });
      setUserState(isEmpty(result) ? users : result);
    }
  }, [search, focused, users]);

  const renderSuccess = () => {
    return (
      <Box radius={6} borderColor="gray3" css={{ padding: '20px' }}>
        <View row>
          <View columns={[1, 1, 1]}>ID</View>
          <View columns={[3, 3, 3]}>Shop name</View>
          <View columns={[3, 3, 3]}>Name</View>
        </View>
        <Space size={8} />
        <Divider size={1} color="gray3" />

        {userState.map(user => {
          return (
            <View key={user.id} row css={{ padding: '8px 0px', alignItems: 'center' }}>
              <View columns={[1, 1, 1]}>{user.id}</View>
              <View columns={[3, 3, 3]}>{user.shopName}</View>
              <View columns={[3, 3, 3]}>{user.name}</View>
              <View columns={[3, 3, 3]}>
                <SelectAntd
                  data={roles}
                  defaultValue={user.roles[0].name}
                  onChange={val => {
                    setRole(val as string);
                  }}
                />
              </View>
              <View columns={[2, 2, 2]}>
                <Button
                  block
                  size="extra-small"
                  radius={4}
                  disabled={userRole !== 'admin'}
                  loading={updateRoleStatus[user.id] === 'loading'}
                  onClick={() => {
                    if (role) {
                      updateAuthor.request({
                        userId: user.id,
                        role,
                      });
                    }
                  }}
                >
                  {i18n.t('general.update')}
                </Button>
              </View>
            </View>
          );
        })}
      </Box>
    );
  };

  return (
    <Dashboard
      Content={() => (
        <View>
          <SectionPageHeader description="" title={`Users ${i18n.t('general.manager')}`} disableButton />
          <DebounceInput
            placeholder={i18n.t('builderPage.search')}
            css={{ width: '300px' }}
            value={search}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            onValueChange={val => {
              setSearch(val);
            }}
          />
          <AsyncComponent status={getStatus} Success={renderSuccess()} />
        </View>
      )}
    />
  );
};

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login-page',
      component: require('@/components/LoginPage').default,
    },
    {
      path: '/register',
      name: 'register-page',
      component: require('@/components/RegisterPage').default
    },
    {
      path: '/StudentDashboard',
      name: 'student-dashboard',
      component: require('@/components/StudentDashboard').default,
    },
    {
      path: '/TeacherDashboard',
      name: 'teacher-dashboard',
      component: require('@/components/TeacherDashboard').default
    },
    {
      path: '/ManagerDashboard',
      name: 'manager-dashboard',
      component: require('@/components/ManagerDashboard').default
    },
    {
      path: '/StudyInfo',
      name: 'StudyInfo',
      component: require('@/StudentAction/StudyInfo').default
    },
    {
      path: '/ChangeInfo',
      name: 'ChangeInfo',
      component: require('@/Public/ChangeInfo').default
    },
    {
      path: '/rp-info',
      name: 'rp-info',
      component: require('@/StudentAction/rp-info').default
    },
    {
      path: '/StuInfoMove',
      name: 'StuInfoMove',
      component: require('@/StudentAction/StuInfoMove').default
    },
    {
      path: '/EleRegister',
      name: 'EleRegister',
      component: require('@/StudentAction/EleRegister').default
    },
    {
      path: '/ParentInfo',
      name: 'ParentInfo',
      component: require('@/StudentAction/ParentInfo').default
    },
    {
      path: '/MinorScheme',
      name: 'MinorScheme',
      component: require('@/StudentAction/MinorScheme').default
    },
    {
      path: '/StuCardPreserve',
      name: 'StuCardPreserve',
      component: require('@/StudentAction/StuCardPreserve').default
    },
    {
      path: '/StudentMove',
      name: 'StudentMove',
      component: require('@/StudentAction/StudentMove').default
    },
    {
      path: '/ChooseProblem',
      name: 'ChooseProblem',
      component: require('@/StudentAction/ChooseProblem').default
    },
    {
      path: '/SubmitPaper',
      name: 'SubmitPaper',
      component: require('@/StudentAction/SubmitPaper').default
    },
    {
      path: '/QueryPaperGrade',
      name: 'QueryPaperGrade',
      component: require('@/StudentAction/QueryPaperGrade').default
    },
    {
      path: '/GoodPaperList',
      name: 'GoodPaperList',
      component: require('@/StudentAction/GoodPaperList').default
    },
    {
      path: '/CurCourseTable',
      name: 'CurCourseTable',
      component: require('@/Public/CurCourseTable').default
    },
    {
      path: '/HisCourseTable',
      name: 'HisCourseTable',
      component: require('@/Public/HisCourseTable').default
    },
    {
      path: '/SpecialChooseCourse',
      name: 'SpecialChooseCourse',
      component: require('@/StudentAction/SpecialChooseCourse').default
    },
    {
      path: '/NormalChooseCourse',
      name: 'NormalChooseCourse',
      component: require('@/StudentAction/NormalChooseCourse').default
    },
    {
      path: '/ChooseCourseResult',
      name: 'ChooseCourseResult',
      component: require('@/StudentAction/ChooseCourseResult').default
    },
    {
      path: '/ComprehensiveInquiry',
      name: 'ComprehensiveInquiry',
      component: require('@/StudentAction/ComprehensiveInquiry').default
    },
    {
      path: '/TeachEvaluate',
      name: 'TeachEvaluate',
      component: require('@/StudentAction/TeachEvaluate').default
    },
    {
      path: '/ExamPlan',
      name: 'ExamPlan',
      component: require('@/StudentAction/ExamPlan').default
    },
    {
      path: '/ExamGrade',
      name: 'ExamGrade',
      component: require('@/StudentAction/ExamGrade').default
    },
    {
      path: '/CultureProgramProcess',
      name: 'CultureProgramProcess',
      component: require('@/StudentAction/CultureProgramProcess').default
    },
    {
      path: '/GuideProgramProcess',
      name: 'GuideProgramProcess',
      component: require('@/StudentAction/GuideProgramProcess').default
    },
    {
      path: '/CourseAlert',
      name: 'CourseAlert',
      component: require('@/Public/CourseAlert').default
    },
    {
      path: '/CoursesInfo',
      name: 'CoursesInfo',
      component: require('@/Public/CoursesInfo').default
    },
    {
      path: '/FreeClassroom',
      name: 'FreeClassroom',
      component: require('@/Public/FreeClassroom').default
    },
    {
      path: '/OrderClassroom',
      name: 'OrderClassroom',
      component: require('@/Public/OrderClassroom').default
    },
    {
      path: '/CoursesManage',
      name: 'CoursesManage',
      component: require('@/TeacherAction/CoursesManage').default
    },
    {
      path: '/EvaluateResult',
      name: 'EvaluateResult',
      component: require('@/TeacherAction/EvaluateResult').default
    },
    {
      path: '/ApplyExam',
      name: 'ApplyExam',
      component: require('@/TeacherAction/ApplyExam').default
    },
    {
      path: '/UploadGrade',
      name: 'UploadGrade',
      component: require('@/TeacherAction/UploadGrade').default
    },
    {
      path: '/StudentInfoManage',
      name: 'StudentInfoManage',
      component: require('@/ManagerAction/StudentInfoManage').default
    },
    {
      path: '/StudentMoveManage',
      name: 'StudentMoveManage',
      component: require('@/ManagerAction/StudentMoveManage').default
    },
    {
      path: '/RewardInfoUpload',
      name: 'RewardInfoUpload',
      component: require('@/ManagerAction/RewardInfoUpload').default
    },
    {
      path: '/EleRegisterManage',
      name: 'EleRegisterManage',
      component: require('@/ManagerAction/EleRegisterManage').default
    },
    {
      path: '/SpecialElective',
      name: 'SpecialElective',
      component: require('@/ManagerAction/SpecialElective').default
    },
    {
      path: '/ExamApprove',
      name: 'ExamApprove',
      component: require('@/ManagerAction/ExamApprove').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

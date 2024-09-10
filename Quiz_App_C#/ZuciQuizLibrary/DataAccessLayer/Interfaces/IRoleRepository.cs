using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.DataAccessLayer.Interfaces
{
    public interface IRoleRepository
    {
        Task<Role> GetRoleNameById(int roleId);
        Task<List<Role>> GetAllRole();
    }
}
